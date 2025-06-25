"use client";
import Comments from "./Comments";
import Image from "next/image";
import Head from "next/head";
import styles from "./blogContent.module.css";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";

const getReadingTime = (html) => {
  const text = html.replace(/<[^>]+>/g, "");
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const formatDate = (timestamp) => {
  try {
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export default function BlogPostPage({ blog }) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (!blog?.content) return;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = blog.content;
    const headings = [...tempDiv.querySelectorAll("h2, h3")];
    const tocItems = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute("id", id);
      return {
        id,
        text: heading.textContent,
        level: heading.tagName,
      };
    });
    setToc(tocItems);
  }, [blog]);

  const url = `https://www.rctechsolutions.com/blogs/${blog.slug}`;

  return (
    <>
      <Head>
        <meta property="og:image" content={blog.blogImageUrl} />
      </Head>

      <div className="mx-auto w-auto md:max-w-[1000px] m-5 mt-20 bg-white p-5 rounded-lg shadow-xl">
        <Image
          src={blog.blogImageUrl}
          alt={blog.title}
          width={1200}
          height={600}
          className="rounded-lg w-full h-auto object-contain"
          priority
        />
        <h1 className="text-black text-center my-10 text-3xl font-bold uppercase">{blog.title}</h1>

        {toc.length > 0 && (
          <div className="my-8 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold text-black mb-2">Table of Contents</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className={`${item.level === "H3" ? "ml-4 text-sm" : "text-base"}`}
                >
                  <a
                    href={`#${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className={`${styles["blog-content"]} my-5 text-black`}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Comments blogId={blog.id} />

        <p className="text-sm text-gray-500 mb-2 text-end pr-5">
          <em>
            By {blog.author} on {formatDate(blog.date)} | {blog.views || 0} views |{" "}
            {getReadingTime(blog.content)} min read
          </em>
        </p>

        <div className="flex gap-4 mb-10">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </div>
    </>
  );
}
