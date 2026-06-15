const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4000";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

interface BlogResponse {
  posts: Post[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

async function getPosts(page = 1, limit = 10): Promise<BlogResponse> {
  const res = await fetch(
    `${BACKEND_URL}/blog/posts?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function Blog({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { posts, totalPages } = await getPosts(page);

  return (
    <main className="px-8 py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Blog</h1>

      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <time className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </time>
            <p className="mt-1 text-gray-700">{post.content.slice(0, 150)}</p>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-8">
          {page > 1 && (
            <a href={`/blog?page=${page - 1}`} className="underline">
              Previous
            </a>
          )}
          <span>
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <a href={`/blog?page=${page + 1}`} className="underline">
              Next
            </a>
          )}
        </div>
      )}
    </main>
  );
}
