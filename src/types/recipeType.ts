import { ResourceType } from "./resourceType";

export interface RecipeType {
  resource: string;
  quantity?: number;
}

export interface RecipeTreeType {
  id: string;
  name: string;
  recipeResource: null | RecipeResourceType;
}

export interface RecipeResourceType {
  [id: string]: RecipeSubResourceType;
}

export interface RecipeSubResourceType {
  resource: ResourceType;
  quantity: number;
  recipeResource: {
    [id: string]: RecipeSubResourceType | null;
  } | null;
}
