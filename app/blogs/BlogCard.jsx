export default function BlogCard({ blog }) {
  return (
    <article className="border rounded-xl p-5 hover:shadow-lg transition">
      <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{blog.excerpt}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{blog.author}</span>
        <span>{new Date(blog.date).toLocaleDateString()}</span>
      </div>
    </article>
  );
}
