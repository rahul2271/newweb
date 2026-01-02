export default function Pagination({ page }) {
  return (
    <div className="flex justify-center gap-6 mt-12">
      {page > 1 && (
        <a href={`/blogs?page=${page - 1}`} className="px-4 py-2 border rounded">
          ← Prev
        </a>
      )}
      <a href={`/blogs?page=${page + 1}`} className="px-4 py-2 border rounded">
        Next →
      </a>
    </div>
  );
}
