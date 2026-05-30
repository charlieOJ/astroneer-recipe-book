import { ResourcePlanetsType } from "../types/resourceType";
import {
  fetchItem,
  fetchItems,
  fetchPlanet,
  fetchPlanets,
  fetchResource,
  fetchResources,
} from "./http";

// Loaders
export const itemsLoader = async () => {
  return await fetchItems();
};

export const itemLoaders = async ({ params }: { params: any }) => {
  return {
    item: await itemLoader(params.id),
    resources: resourcesLoader(),
  };
};

export const resourceLoaders = async ({ params }: { params: any }) => {
  return {
    resource: await resourceLoader(params.id),
    resources: resourcesLoader(),
  };
};

export const planetLoaders = async ({ params }: { params: any }) => {
  return {
    planet: await planetLoader(params.id),
  };
};

// Item - Items
const itemLoader = async (id: string) => {
  return await fetchItem(id);
};

// Resource - Resources
export const resourcesLoader = async (ids?: string[]) => {
  if (ids) return await fetchResources(ids);

  return await fetchResources();
};

const resourceLoader = async (id: string) => {
  return await fetchResource(id);
};

// Planets - Planet
export const planetsLoader = async (planets?: any | ResourcePlanetsType) => {
  if (planets) return await fetchPlanets(planets);

  return await fetchPlanets();
};

const planetLoader = async (id: string) => {
  return await fetchPlanet(id);
};
