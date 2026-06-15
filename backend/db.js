const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "blog.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// Seed a few posts if the table is empty
const count = db.prepare("SELECT COUNT(*) as n FROM posts").get();
if (count.n === 0) {
  const insert = db.prepare(
    "INSERT INTO posts (title, slug, content, created_at) VALUES (?, ?, ?, ?)"
  );
  insert.run("Hello World", "hello-world", "My first post.", "2026-01-10T10:00:00");
  insert.run("Building My Site", "building-my-site", "How I built this.", "2026-03-20T12:00:00");
  insert.run("What I've Been Up To", "what-ive-been-up-to", "A life update.", "2026-06-01T09:00:00");
}

module.exports = db;
