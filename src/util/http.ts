import { ItemType } from "../types/itemType";
import { ResourceType } from "../types/resourceType";
import { PlanetType } from "../types/planetType";
import { HazardType } from "../types/hazardType";

import { get, ref } from "firebase/database";
import { db } from "../firebaseConfig";

// Fetch resources
export const fetchResources = async (
  ids?: string[],
): Promise<{ resources: ResourceType[] } | { error: string } | ResponseType> => {
  try {
    const snapshot = await get(ref(db, "resources"));
    if (snapshot.exists()) {
      const response = snapshot.val();

      const data = response.filter((resource: ResourceType, index: number) => {
        resource.slug = index;
        return (ids && ids.includes(resource.id)) || !ids;
      });

      return { resources: data };
    } else {
      return { error: "No resources found." };
    }
    // }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch resources." }), {
      status: 500,
    });
  }
};

export const fetchResource = async (
  id: string,
): Promise<{ resource: ResourceType } | { error: string } | ResponseType> => {
  try {
    const snapshot = await get(ref(db, `resources/${id}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      return { resource: data };
    } else {
      return { error: "No resource found." };
    }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch resource." }), {
      status: 500,
    });
  }
};

// Fetch items
export const fetchItems = async (): Promise<
  { items: ItemType[] } | { error: string } | ResponseType
> => {
  try {
    const snapshot = await get(ref(db, "items"));

    if (snapshot.exists()) {
      const response = snapshot.val();
      const data = response.map((item: ItemType, index: number) => {
        item.slug = index;
        return item;
      });

      return { items: data };
    } else {
      return { error: "No items found." };
    }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch items." }), {
      status: 500,
    });
  }
};

export const fetchItem = async (
  id: string,
): Promise<{ item: ItemType } | { error: string } | ResponseType> => {
  try {
    const snapshot = await get(ref(db, `items/${id}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      return { item: data };
    } else {
      return { error: "No item found." };
    }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch item." }), {
      status: 500,
    });
  }
};

// Fetch planets
export const fetchPlanets = async (
  ids?: string[],
): Promise<{ planets: PlanetType[] } | { error: string } | ResponseType> => {
  try {
    const snapshot = await get(ref(db, "planets"));
    if (snapshot.exists()) {
      const response = snapshot.val();
      const data = response.filter((planet: PlanetType, index: number) => {
        planet.slug = index;
        return (ids && ids.includes(planet.id)) || !ids;
      });

      return { planets: data };
    } else {
      return { error: "No planets found." };
    }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch planets." }), {
      status: 500,
    });
  }
};

export const fetchPlanet = async (
  id: string,
): Promise<{ planet: PlanetType } | { error: string } | ResponseType> => {
  try {
    const snapshot = await get(ref(db, `planets/${id}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      return { planet: data };
    } else {
      return { error: "No planet found." };
    }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch planet." }), {
      status: 500,
    });
  }
};

// Fetch hazards
export const fetchHazards = async (
  ids?: string[],
): Promise<{ hazards: HazardType[] } | { error: string } | ResponseType> => {
  try {
    const snapshot = await get(ref(db, "hazards"));
    if (snapshot.exists()) {
      const response = snapshot.val();
      const data = response.filter((hazard: HazardType, index: number) => {
        hazard.slug = index;
        return (ids && ids.includes(hazard.id)) || !ids;
      });

      return { hazards: data };
    } else {
      return { error: "No hazards found." };
    }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch hazards." }), {
      status: 500,
    });
  }
};

export const fetchHazard = async (
  id: string,
): Promise<{ hazard: HazardType } | { error: string } | ResponseType> => {
  try {
    const snapshot = await get(ref(db, `hazards/${id}`));

    if (snapshot.exists()) {
      const data = snapshot.val();

      return { hazard: data };
    } else {
      return { error: "No hazard found." };
    }
  } catch (error) {
    throw new Response(JSON.stringify({ message: error || "Failed to fetch hazard." }), {
      status: 500,
    });
  }
};
