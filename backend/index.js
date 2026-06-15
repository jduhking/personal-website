const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/blog/posts", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const offset = (page - 1) * limit;

  const posts = db
    .prepare(
      "SELECT id, title, slug, content, created_at FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?"
    )
    .all(limit, offset);

  const { total } = db.prepare("SELECT COUNT(*) as total FROM posts").get();

  res.json({ posts, page, limit, total, totalPages: Math.ceil(total / limit) });
});

app.get("/blog/posts/:slug", (req, res) => {
  const post = db
    .prepare("SELECT * FROM posts WHERE slug = ?")
    .get(req.params.slug);
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
