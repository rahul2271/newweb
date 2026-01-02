export default function FeaturedBlogCard({ blog }) {
  return (
    <article className="border-2 border-primary rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
      <p className="text-sm mb-4">{blog.excerpt}</p>
      <div className="flex justify-between text-xs opacity-70">
        <span>{blog.author}</span>
        <span>{new Date(blog.date).toLocaleDateString()}</span>
      </div>
    </article>
  );
}
