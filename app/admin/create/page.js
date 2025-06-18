"use client";
import { useState } from "react";
import { db, storage } from "../../../firebase/client";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState("published");
  const [coverImage, setCoverImage] = useState(null);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Start writing your blog...</p>",
  });

  const uploadEditorImage = async (event) => {
    const file = event.target.files[0];
    if (!file || !editor) return;

    const imageRef = ref(storage, `blog-content/${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    editor.chain().focus().setImage({ src: url }).run();
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const handleSubmit = async () => {
    if (
      !title ||
      !editor ||
      !editor.getHTML() ||
      !coverImage ||
      !author ||
      !seoTitle ||
      !seoDescription
    ) {
      return alert("Please fill all required fields.");
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const coverRef = ref(storage, `blogs/${coverImage.name}`);
    await uploadBytes(coverRef, coverImage);
    const coverUrl = await getDownloadURL(coverRef);

    await addDoc(collection(db, "blogs"), {
      title,
      slug: finalSlug,
      content: editor.getHTML(),
      tags: tags.split(",").map((t) => t.trim()),
      image: coverUrl,
      createdAt: Timestamp.now(),
      author,
      seoTitle,
      seoDescription,
      status,
    });

    router.push("/admin");
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Blog</h1>

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Slug (optional, auto-generated from title)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="SEO Title"
        value={seoTitle}
        onChange={(e) => setSeoTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="SEO Description"
        rows={3}
        value={seoDescription}
        onChange={(e) => setSeoDescription(e.target.value)}
      />

      <div className="mb-4">
        <label className="block font-medium mb-1">Cover Image</label>
        <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />
      </div>

      {/* Toolbar */}
      {editor && (
        <div className="flex flex-wrap gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              className={`px-2 py-1 rounded text-sm ${
                editor.isActive("heading", { level })
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              H{level}
            </button>
          ))}

          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive("bold") ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            B
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive("italic") ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            I
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 rounded ${
              editor.isActive("underline") ? "bg-purple-600 text-white" : "bg-gray-200"
            }`}
          >
            U
          </button>

          {["left", "center", "right", "justify"].map((align) => (
            <button
              key={align}
              onClick={() => editor.chain().focus().setTextAlign(align).run()}
              className="px-2 py-1 bg-gray-200 rounded capitalize"
            >
              {align}
            </button>
          ))}
        </div>
      )}

      {/* Editor */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Blog Content</label>
        <div className="border p-2 rounded min-h-[300px] bg-white">
          <EditorContent editor={editor} />
        </div>
        <input
          type="file"
          onChange={uploadEditorImage}
          className="mt-2"
          accept="image/*"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Status</label>
        <select
          className="w-full p-2 border rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <button
        className="bg-purple-600 text-white px-6 py-2 rounded"
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
}
