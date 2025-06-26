import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to My Blog</h1>
      <p>This is a simple blog built with Next.js.</p>
      <Link
        href="/posts"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        View All Posts
      </Link>
    </main>
  );
}
