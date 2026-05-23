export const fetchResources = async () => {
  const response = await fetch("http://localhost:3001/resources");
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch resources." }), { status: 500 });
  }

  return { resources: data.resources };
};

export const fetchItems = async () => {
  const response = await fetch("http://localhost:3001/items");
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch items." }), { status: 500 });
  }

  return { items: data.items };
};

export const fetchItem = async (id: string) => {
  const response = await fetch(`http://localhost:3001/item/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch item." }), { status: 500 });
  }

  return { item: data.item };
};
