import { db } from "../../firebase";
import { collection, getDocs, query, where, doc, updateDoc, increment } from "firebase/firestore";
import BlogPostPage from "./blogpostpage";
import { notFound } from "next/navigation";

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
    description: blog.metaDescription || blog.title,
    openGraph: {
      images: [blog.blogImageUrl],
    },
    metadataBase: new URL("https://www.rctechsolutions.com"),
  };
}

export default async function Page({ params }) {
  const decodedSlug = decodeURIComponent(params.title);
  const q = query(collection(db, "blogs"), where("slug", "==", decodedSlug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const blog = snapshot.docs[0].data();
  const blogId = snapshot.docs[0].id;

  // ✅ Increment views
  await updateDoc(doc(db, "blogs", blogId), {
    views: increment(1),
  });

  return <BlogPostPage blog={{ ...blog, id: blogId }} />;
}
