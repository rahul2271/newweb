"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
  updateDoc,
  increment,
  doc,
} from 'firebase/firestore';
import Image from 'next/image';
import Head from 'next/head';
import styles from './blogContent.module.css';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';

const formatDate = (timestamp) => {
  if (timestamp?.toDate) {
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return "";
};

const getReadingTime = (html) => {
  const text = html.replace(/<[^>]+>/g, '');
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export default function BlogPostPage() {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [toc, setToc] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const decodedTitle = decodeURIComponent(title);
        const q = query(collection(db, 'blogs'), where('slug', '==', decodedTitle));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const blogData = querySnapshot.docs[0].data();
          const blogId = querySnapshot.docs[0].id;
          setPost({ ...blogData, id: blogId });
          await updateDoc(doc(db, 'blogs', blogId), { views: increment(1) });
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
  }, [title]);

  useEffect(() => {
    if (!post?.content) return;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const headings = [...tempDiv.querySelectorAll('h2, h3')];
    const tocItems = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute('id', id);
      return {
        id,
        text: heading.textContent,
        level: heading.tagName,
      };
    });
    setToc(tocItems);
    setPost(prev => ({ ...prev, content: tempDiv.innerHTML }));
  }, [post?.content]);

  useEffect(() => {
    if (!post?.id) return;
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, 'blogs', post.id, 'comments'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setComments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [post?.id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      let activeId = '';
      toc.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos + 100) activeId = id;
      });
      document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.toggle('font-bold', link.getAttribute('href') === `#${activeId}`);
        link.classList.toggle('text-blue-600', link.getAttribute('href') === `#${activeId}`);
      });

      const scrolled = scrollPos / (document.body.scrollHeight - window.innerHeight);
      setScroll(scrolled * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!post?.category) return;
      const q = query(collection(db, 'blogs'), where('category', '==', post.category), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => p.slug !== post.slug)
        .slice(0, 3);
      setRelatedPosts(posts);
    };
    fetchRelated();
  }, [post?.category]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput || !nameInput || !post?.id) return;
    setCommentLoading(true);
    try {
      await addDoc(collection(db, 'blogs', post.id, 'comments'), {
        name: nameInput,
        text: commentInput,
        createdAt: serverTimestamp(),
      });
      setCommentInput('');
      setNameInput('');
      const q = query(collection(db, 'blogs', post.id, 'comments'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setComments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Blog post not found</div>;

  const url = `https://www.rctechsolutions.com/blog/${post.slug || title}`;

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.metaDescription || post.title} />
        <meta property="og:image" content={post.blogImageUrl} />
      </Head>

      <div className="fixed top-0 left-0 w-full z-50">
        <div className="h-1 bg-blue-600" style={{ width: `${scroll}%` }} />
      </div>

      <div className='mx-auto w-auto md:max-w-[1000px] m-5 mt-20 bg-white p-5 rounded-lg shadow-xl'>
        <div className="w-full my-5 rounded-lg overflow-hidden">
          <Image
            src={post.blogImageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="rounded-lg w-full h-auto object-contain"
            priority
          />
        </div>

        <h1 className='text-black text-center my-10 text-3xl font-bold uppercase'>{post.title}</h1>

        {toc.length > 0 && (
          <div className="my-8 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold text-black mb-2">Table of Contents</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              {toc.map((item) => (
                <li key={item.id} className={`${item.level === 'H3' ? 'ml-4 text-sm' : 'text-base'}`}>
                  <a href={`#${item.id}`} className="toc-link text-blue-600 hover:underline">{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`${styles['blog-content']} my-5 text-black`} dangerouslySetInnerHTML={{ __html: post.content }} />

        <p className='text-sm text-gray-500 mb-2 text-end pr-5'>
          <em>By {post.author} on {formatDate(post.date)} | {post.views || 0} views | {getReadingTime(post.content)} min read</em>
        </p>

        <div className="flex gap-4 mb-10">
          <FacebookShareButton url={url}><FacebookIcon size={32} round /></FacebookShareButton>
          <WhatsappShareButton url={url}><WhatsappIcon size={32} round /></WhatsappShareButton>
          <LinkedinShareButton url={url}><LinkedinIcon size={32} round /></LinkedinShareButton>
          <TwitterShareButton url={url}><TwitterIcon size={32} round /></TwitterShareButton>
        </div>

        <hr className='border border-gray-300 my-5' />

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-black">Leave a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" className="border border-gray-300 rounded px-4 py-2" value={nameInput} onChange={(e) => setNameInput(e.target.value)} required />
            <textarea placeholder="Your Comment" className="border border-gray-300 rounded px-4 py-2" rows="4" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} required />
            <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" disabled={commentLoading}>
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-black">{comments.length} Comment{comments.length !== 1 ? 's' : ''}</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment.id} className="border border-gray-200 rounded p-3 bg-gray-50">
                  <p className="text-gray-800">{comment.text}</p>
                  <p className="text-sm text-gray-500 mt-2">– <strong>{comment.name}</strong></p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-black mb-4">Related Posts</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedPosts.map(p => (
                <div key={p.id} className="bg-white rounded shadow p-3">
                  <Image src={p.blogImageUrl} alt={p.title} width={400} height={200} className="rounded-lg w-full h-40 object-cover" />
                  <h3 className="text-lg font-semibold mt-3">{p.title}</h3>
                  <a href={`/blog/${p.slug}`} className="text-blue-600 text-sm mt-2 block hover:underline">Read More</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
