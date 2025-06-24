// ✅ This is your SERVER COMPONENT — do NOT add "use client"
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import BlogPostPage from "./blogpostpage";

export async function generateMetadata({ params }) {
  const decodedSlug = decodeURIComponent(params.title);
  const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      title: "Blog Not Found | RC Tech Solutions",
      description: "This blog could not be found.",
    };
  }

  const blog = snapshot.docs[0].data();

  return {
    title: `${blog.title} | RC Tech Solutions`,
    description: blog.description || blog.title,
    keywords: [
      "RC Tech Solutions Blog",
      blog.title,
      blog.category || "Tech",
      "Web Development",
      "Next.js",
    ],
    openGraph: {
      title: `${blog.title} | RC Tech Solutions`,
      description: blog.description || blog.title,
      url: `https://www.rctechsolutions.com/blogs/${blog.slug}`,
      siteName: "RC Tech Solutions",
      images: [
        {
          url: blog.blogImageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description || blog.title,
      images: [blog.blogImageUrl],
    },
    metadataBase: new URL("https://www.rctechsolutions.com"),
  };
}

// Server-rendered wrapper
export default function Page({ params }) {
  return <BlogPostPage title={params.title} />;
}
