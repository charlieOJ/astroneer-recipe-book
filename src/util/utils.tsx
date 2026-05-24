import { ItemType } from "../types/itemType";
import { RecipeResourceType, RecipeTreeType } from "../types/recipeType";
import { ResourceType } from "../types/resourceType";

export const toCapitalizeCase = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const recipeTreeData = (
  resources: ResourceType[],
  element: ItemType | ResourceType,
): RecipeTreeType => {
  return {
    id: element.id,
    name: element.name,
    recipeResource: getRecipeResource(element, resources),
  };
};

const getRecipeResource = (
  element: ItemType | ResourceType,
  resources: ResourceType[],
): RecipeResourceType | null => {
  if (!element || !element?.recipe) return null;
  const recipeResource = {} as any;

  element.recipe?.forEach((ing: any) => {
    const currentResource = resources.find(
      (r: ResourceType) => r.id === ing.resource,
    ) as ResourceType;

    recipeResource[ing.resource] = { resource: currentResource, quantity: ing.quantity ?? 1 };
    recipeResource[ing.resource] = {
      ...recipeResource[ing.resource],
      recipeResource: getRecipeResource(currentResource, resources),
    };
  });

  return recipeResource;
};
