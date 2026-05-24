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

app.get("/resource/:id", async (req, res) => {
  const fileContent = (await fs.readFile("./data/resources.json")) as any;
  const data = JSON.parse(fileContent);
  const resource = data.find((resource: any) => resource.id === req.params.id);

  res.status(200).json({ resource });
});

app.get("/items", async (req, res) => {
  const fileContent = (await fs.readFile("./data/items.json")) as any;
  const data = JSON.parse(fileContent);

  res.status(200).json({ items: data });
});

app.get("/item/:id", async (req, res) => {
  const fileContent = (await fs.readFile("./data/items.json")) as any;
  const data = JSON.parse(fileContent);
  const item = data.find((item: any) => item.id === req.params.id);

  res.status(200).json({ item });
});

app.get("/planets", async (req, res) => {
  const fileContent = (await fs.readFile("./data/planets.json")) as any;
  const data = JSON.parse(fileContent);

  res.status(200).json({ planets: data });
});

app.get("/planet/:id", async (req, res) => {
  const fileContent = (await fs.readFile("./data/planets.json")) as any;
  const data = JSON.parse(fileContent);
  const planet = data.find((planet: any) => planet.id === req.params.id);

  res.status(200).json({ planet });
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
