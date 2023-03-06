const express = require("express");
const db = require("better-sqlite3")("kits.db", {});

const c = db.prepare("SELECT COUNT(*) FROM kits;").get();
console.log(c);
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
