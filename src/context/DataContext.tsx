import { createContext, useContext, useEffect, useState } from "react";

import { get, ref } from "firebase/database";
import { db } from "../firebaseConfig";

import { ItemType } from "../types/itemType";
import { ResourceType } from "../types/resourceType";
import { HazardType } from "../types/hazardType";
import { PlanetType } from "../types/planetType";
import { addSlugAndKind } from "../util/utils";

interface DataContextType {
  planets: PlanetType[];
  items: ItemType[];
  resources: ResourceType[];
  hazards: HazardType[];
  loading: boolean;
  error: string | null;
}

export const DataContext = createContext<DataContextType>({
  planets: [],
  items: [],
  resources: [],
  hazards: [],
  loading: false,
  error: null,
});

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Response(
      JSON.stringify({ message: "useDataContext must be used within a DataProvider" }),
      {
        status: 500,
      },
    );
  }
  return context;
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [planets, setPlanets] = useState<PlanetType[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [resources, setResources] = useState<ResourceType[]>([]);
  const [hazards, setHazards] = useState<HazardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<React.SetStateAction<any>> => {
      try {
        setLoading(true);
        const snapshot = await get(ref(db));

        if (snapshot.exists()) {
          const data = snapshot.val();

          setPlanets(
            data.planets.map((planet: PlanetType, index: number) =>
              addSlugAndKind(planet, index, "planet"),
            ),
          );
          setItems(
            data.items.map((item: ItemType, index: number) => addSlugAndKind(item, index, "item")),
          );
          setResources(
            data.resources.map((resource: ResourceType, index: number) =>
              addSlugAndKind(resource, index, "resource"),
            ),
          );
          setHazards(
            data.hazards.map((hazard: HazardType, index: number) =>
              addSlugAndKind(hazard, index, "hazard"),
            ),
          );
          setError(null);
        } else {
          setError("No data found.");
        }
        setLoading(false);
      } catch (error) {
        setError(JSON.stringify(error) || "No data found.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    planets,
    items,
    resources,
    hazards,
    loading,
    error,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
