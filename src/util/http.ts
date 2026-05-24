import { ItemType } from "../types/itemType";
import { ResourceType } from "../types/resourceType";
import { PlanetType } from "../types/planetType";

export const fetchResources = async (): Promise<{ resources: ResourceType[] } | ResponseType> => {
  const response = await fetch("http://localhost:3001/resources");
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch resources." }), { status: 500 });
  }

  return { resources: data.resources };
};

export const fetchResource = async (
  id: string,
): Promise<{ resource: ResourceType } | ResponseType> => {
  const response = await fetch(`http://localhost:3001/resource/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch resource." }), { status: 500 });
  }

  return { resource: data.resource };
};

export const fetchItems = async (): Promise<{ items: ItemType[] } | ResponseType> => {
  const response = await fetch("http://localhost:3001/items");
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch items." }), { status: 500 });
  }

  return { items: data.items };
};

export const fetchItem = async (id: string): Promise<{ item: ItemType } | ResponseType> => {
  const response = await fetch(`http://localhost:3001/item/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch item." }), { status: 500 });
  }

  return { item: data.item };
};

export const fetchPlanets = async (): Promise<{ planets: PlanetType[] } | ResponseType> => {
  const response = await fetch("http://localhost:3001/planets");
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch planets." }), { status: 500 });
  }

  return { planets: data.planets };
};

export const fetchPlanet = async (id: string): Promise<{ planet: PlanetType } | ResponseType> => {
  const response = await fetch(`http://localhost:3001/planet/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch planet." }), { status: 500 });
  }

  return { planet: data.planet };
};
