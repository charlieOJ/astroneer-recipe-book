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

// Resources requests
app.get("/resources", async (_req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/resources.json")) as any;
    const data = JSON.parse(fileContent);

    res.status(200).json({ resources: data });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch resources." });
  }
});

app.get("/resources/:ids", async (req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/resources.json")) as any;
    const data = JSON.parse(fileContent);
    const resources = data.filter((resource: any) => req.params.ids.includes(resource.id));

    res.status(200).json({ resources });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch resources." });
  }
});

app.get("/resource/:id", async (req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/resources.json")) as any;
    const data = JSON.parse(fileContent);
    const resource = data.find((resource: any) => resource.id === req.params.id);

    res.status(200).json({ resource });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch resource data." });
  }
});

// Items requests
app.get("/items", async (_req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/items.json")) as any;
    const data = JSON.parse(fileContent);

    res.status(200).json({ items: data });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch items." });
  }
});

app.get("/item/:id", async (req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/items.json")) as any;
    const data = JSON.parse(fileContent);
    const item = data.find((item: any) => item.id === req.params.id);

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch item data." });
  }
});

// Planets requests
app.get("/planets", async (_req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/planets.json")) as any;
    const data = JSON.parse(fileContent);

    res.status(200).json({ planets: data });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch planets." });
  }
});

app.get("/planets/:ids", async (req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/planets.json")) as any;
    const data = JSON.parse(fileContent);
    const planets = data.filter((planet: any) => req.params.ids.includes(planet.id));

    res.status(200).json({ planets });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch planets." });
  }
});

app.get("/planet/:id", async (req, res) => {
  try {
    const fileContent = (await fs.readFile("./data/planets.json")) as any;
    const data = JSON.parse(fileContent);
    const planet = data.find((planet: any) => planet.id === req.params.id);

    res.status(200).json({ planet });
  } catch (error) {
    res.status(500).json({ error: error || "Failed to fetch planet data." });
  }
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
