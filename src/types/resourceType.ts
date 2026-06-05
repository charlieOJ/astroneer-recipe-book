import { RecipeType } from "./recipeType";

export interface ResourceType {
  id: string;
  slug?: number;
  name: string;
  type: string;
  obtainBy?: string;
  recipe?: RecipeType[];
  planets: any | ResourcePlanetsType;
}

export interface ResourcePlanetsType {
  primary: string;
  secondary: string;
}
