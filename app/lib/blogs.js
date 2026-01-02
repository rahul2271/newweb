import { db } from "../firebase";

export async function getBlogs({ page = 1, limit = 6, category }) {
  let q = db.collection("blogs").orderBy("date", "desc");

  if (category && category !== "All") {
    q = q.where("category", "==", category);
  }

  const snapshot = await q.limit(limit).offset((page - 1) * limit).get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      author: data.author,
      featured: data.featured || false,
      date: data.date.toDate().toISOString(),
    };
  });
}

export async function getFeaturedBlogs() {
  const snapshot = await db
    .collection("blogs")
    .where("featured", "==", true)
    .orderBy("date", "desc")
    .limit(3)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      author: data.author,
      date: data.date.toDate().toISOString(),
    };
  });
}
