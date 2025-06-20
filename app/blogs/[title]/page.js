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
} from 'firebase/firestore';
import Image from 'next/image';
import styles from './blogContent.module.css';

export default function BlogPostPage() {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const decodedTitle = decodeURIComponent(title);
        const q = query(collection(db, 'blogs'), where('slug', '==', decodedTitle));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const blogData = querySnapshot.docs[0].data();
          setPost({ ...blogData, id: querySnapshot.docs[0].id });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching blog post: ", error);
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
    setPost(prev => ({
      ...prev,
      content: tempDiv.innerHTML,
    }));
  }, [post?.content]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!post?.id) return;
      try {
        const q = query(
          collection(db, 'blogs', post.id, 'comments'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const commentList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(commentList);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [post?.id]);

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
      const q = query(
        collection(db, 'blogs', post.id, 'comments'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const commentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentList);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Blog post not found</div>;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.blogImageUrl,
    "editor": post.author,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "RC Tech Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.rctechsolutions.com/rclogo.png"
      }
    },
    "url": `https://www.rctechsolutions.com/blog/${post.slug || title}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `www.rctechsolutions.com/blog/${post.slug || title}`
    },
    "datePublished": post.date,
    "description": post.description || post.title,
    "articleBody": post.content?.replace(/<[^>]+>/g, '')?.slice(0, 300)
  };

  return (
    <div className='mx-auto w-auto md:max-w-[800px] m-5 mt-20 bg-white p-5 rounded-lg shadow-sm'>

      {/* JSON-LD Schema.org */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* Sidebar CTA (Desktop) */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex">
        <div className="w-64 bg-white/90 backdrop-blur-lg border border-[#953ee2] rounded-2xl shadow-2xl p-5 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105">
          <img src="/rclogo.png" alt="RC Tech Logo" className="w-12 h-12 rounded-full border-2 border-[#953ee2] shadow-lg" />
          <img src="/rahul.jpeg" alt="Rahul Chauhan" className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover" />
          <h3 className="text-lg font-semibold text-[#953ee2] text-center">RC Tech Solutions</h3>
          <p className="text-sm text-center text-gray-700 font-medium">
            We build luxury-grade digital solutions — websites, branding & more.
          </p>
          <a href="https://www.rctechsolutions.com" target="_blank" className="bg-[#953ee2] text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-[#7a2bd4] transition-all duration-300">Let’s Work</a>
        </div>
      </div>

      {/* CTA for Mobile */}
      <div className="fixed bottom-5 right-5 z-50 md:hidden">
        <a href="https://www.rctechsolutions.com" target="_blank" className="flex items-center gap-2 bg-[#953ee2] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
          <img src="/rclogo.png" alt="Logo" className="w-6 h-6 rounded-full" />
          <span className="text-sm font-medium">Work with RC Tech</span>
        </a>
      </div>

      {/* Blog Header */}
      <div className="relative w-full h-64 md:h-96">
        <Image
          className="rounded-lg object-fill"
          src={post.blogImageUrl}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          priority={true}
        />
      </div>

      <h1 className='text-black text-center my-10 text-3xl font-bold uppercase'>{post.title}</h1>

      {/* Table of Contents */}
      {toc.length > 0 && (
        <div className="my-8 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold text-black mb-2">Table of Contents</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {toc.map((item) => (
              <li key={item.id} className={`${item.level === 'H3' ? 'ml-4 text-sm' : 'text-base'}`}>
                <a href={`#${item.id}`} className="text-blue-600 hover:underline">{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Blog Content */}
      <div className={`${styles['blog-content']} my-5 text-black`} dangerouslySetInnerHTML={{ __html: post.content }}></div>

      <p className='text-sm text-gray-400 mb-5 text-end pr-5'><em>By {post.author} on {post.date}</em></p>
      <hr className='border border-gray-300 my-5' />

      {/* Comment Form */}
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

      {/* Comments List */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-black">Comments</h2>
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
    </div>
  );
}
