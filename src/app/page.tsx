import Link from "next/link";

/**
 * Renders home page
 * @returns Rendered Home Page (JSX.Element)
 */
export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <section>
        <h1>Welcome to Dev Learnings</h1>
        <p>
          I share what I learn about web development, new tools, and software
          engineering concepts. Updated as I grow!
        </p>
      </section>
      <section>
        <h2>About Me</h2>
        <p>
          I'm a developer documenting my journey through modern tech —
          especially frontend tools like Next.js, Tailwind, etc.
        </p>
      </section>

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
