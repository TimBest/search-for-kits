const express = require("express");
const db = require("better-sqlite3")("kits.db", {});

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/// GET http://localhost:3001/api?kit_id=123
// TODO: improve route name
app.get("/api", (req, res) => {
  // TODO: return error if kit_id is too small?
  // TODO: return error if kit_id is too big?
  // TODO: return error if kit_id contains anything other than a 0->9 or "-". safe assumption?
  // TODO: order results by kit_id
  const c = db
    .prepare(
      `SELECT * FROM kits WHERE label_id LIKE '${req.query.kit_id}%' LIMIT 5;`
    )
    .all();
  res.json({ results: c });
});
