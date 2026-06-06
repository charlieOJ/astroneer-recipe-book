import { createContext, useContext, useEffect, useState } from "react";

import { get, ref } from "firebase/database";
import { db } from "../firebaseConfig";

import { ItemType } from "../types/itemType";
import { ResourceType } from "../types/resourceType";
import { HazardType } from "../types/hazardType";
import { PlanetType } from "../types/planetType";
import { addKind, addSlug } from "../util/utils";

interface DataContextType {
  planets: PlanetType[];
  items: ItemType[];
  resources: ResourceType[];
  hazards: HazardType[];
  loading: boolean;
  error: object;
}

export const DataContext = createContext<DataContextType>({
  planets: [],
  items: [],
  resources: [],
  hazards: [],
  loading: false,
  error: {},
});

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<object>({});

  useEffect(() => {
    const fetchData = async (): Promise<React.SetStateAction<any>> => {
      try {
        setLoading(true);
        const snapshot = await get(ref(db));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setData(data);
        } else {
          setError({ message: "No data found.", status: 500 });
        }
        setLoading(false);
      } catch (error) {
        setError({ message: error || "No data found.", status: 500 });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addSlugAndKind = (
    elem: PlanetType | ItemType | ResourceType | HazardType,
    index: number,
    kind: "planet" | "resource" | "item" | "hazard",
  ) => {
    elem = addSlug(elem, index);
    elem = addKind(elem, kind);
    return elem;
  };

  let planets = [] as any;
  let items = [] as any;
  let resources = [] as any;
  let hazards = [] as any;

  if (Object.keys(data).length > 0) {
    planets = data.planets.map((planet: PlanetType, index: number) => {
      return addSlugAndKind(planet, index, "planet");
    });
    items = data.items.map((item: ItemType, index: number) => {
      return addSlugAndKind(item, index, "item");
    });
    resources = data.resources.map((resource: ResourceType, index: number) => {
      return addSlugAndKind(resource, index, "resource");
    });
    hazards = data.hazards.map((hazard: HazardType, index: number) => {
      return addSlugAndKind(hazard, index, "hazard");
    });
  }

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
