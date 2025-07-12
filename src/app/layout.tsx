import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dev Learnings",
  description: "A blog of new tech concepts I have learnt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", background: "#eee" }}>
          <Link href="/">
            <h3>Dev Learnings</h3>
          </Link>
        </header>
        <main style={{ padding: "2rem" }}>{children}</main>
        <footer style={{ padding: "1rem", background: "#eee" }}>
          © 2025 My Blog
        </footer>
      </body>
    </html>
  );
}
