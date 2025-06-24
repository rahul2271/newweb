import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";

export async function generateMetadata({ params }) {
  const decodedTitle = decodeURIComponent(params.title);

  const q = query(collection(db, "blogs"), where("slug", "==", decodedTitle));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      title: "Blog Not Found | RC Tech Solutions",
      description: "This blog does not exist or has been removed.",
    };
  }

  const post = snapshot.docs[0].data();

  return {
    title: `${post.title} | RC Tech Solutions`,
    description: post.description || post.title,
    keywords: post.keywords || ["RC Tech Blog", "Web Dev Tips", "Freelance Guide", "Tech Career", "RC Tech Solutions"],
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | RC Tech Solutions`,
      description: post.description || post.title,
      url: `https://www.rctechsolutions.com/blogs/${post.slug}`,
      siteName: "RC Tech Solutions",
      locale: "en_IN",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.blogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | RC Tech Solutions`,
      description: post.description || post.title,
      creator: "@rctechsolutions", // Replace with real handle
      images: [post.blogImageUrl],
    },
    metadataBase: new URL("https://www.rctechsolutions.com"),
  };
}
