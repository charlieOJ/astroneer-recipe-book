import { RecipeType } from "./recipeType";

export interface ItemType {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  tier: number;
  recipe?: RecipeType[];
  cost?: number | string;
  type?: string;
  size?: string;
}
