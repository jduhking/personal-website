import "./globals.css";
import Link from "next/link";

export const metadata = { title: "James Odebiyi" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-4 px-4 py-2 justify-end">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/games">Games</Link>
        </nav>
        <div id="content">{children}</div>
      </body>
    </html>
  );
}
