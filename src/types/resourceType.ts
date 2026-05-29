import { RecipeType } from "./recipeType";

export interface ResourceType {
  id: string;
  slug?: number;
  name: string;
  icon: string;
  image: string;
  type: string;
  obtainBy?: string;
  recipe?: RecipeType[];
  planets: string[];
}
