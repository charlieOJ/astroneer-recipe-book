import fs from "node:fs/promises";
import express from "express";

const app = express();
const port = 3001;

app.use(express.static("images"));

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/resources", async (req, res) => {
  const fileContent = (await fs.readFile("./data/resources.json")) as any;

  const data = JSON.parse(fileContent);

  res.status(200).json({ resources: data });
});

app.get("/items", async (req, res) => {
  const fileContent = (await fs.readFile("./data/items.json")) as any;

  const data = JSON.parse(fileContent);

  res.status(200).json({ items: data });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
