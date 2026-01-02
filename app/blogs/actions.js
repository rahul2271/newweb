"use server";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";

export async function fetchMoreBlogs({ cursor, category = "All" }) {
  const PAGE_SIZE = 6;

  let q = query(
    collection(db, "blogs"),
    orderBy("date", "desc"),
    limit(PAGE_SIZE)
  );

  if (category !== "All") {
    q = query(
      collection(db, "blogs"),
      where("category", "==", category),
      orderBy("date", "desc"),
      limit(PAGE_SIZE)
    );
  }

  if (cursor) {
    q = query(q, startAfter(cursor)); // cursor = date value
  }

  const snapshot = await getDocs(q);

  const blogs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastBlog = blogs[blogs.length - 1] || null;

  return {
    blogs,
    cursor: lastBlog?.date || null,
  };
}
