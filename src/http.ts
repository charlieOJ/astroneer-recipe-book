export const fetchResources = async () => {
  const response = await fetch("http://localhost:3001/resources");

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch resources.");
  }

  return data.resources;
};

export const fetchItems = async () => {
  const response = await fetch("http://localhost:3001/items");

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch user items.");
  }

  return data.items;
};
