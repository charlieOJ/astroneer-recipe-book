import { RecipeType } from "./recipeType";

export interface ItemType {
  id: string;
  slug?: number;
  name: string;
  tier: number[];
  recipe?: RecipeType[];
  cost?: number | string;
  type?: string;
  size?: string;
  kind?: "item";
}
