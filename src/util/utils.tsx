import images from "../imagesConfig";
import { HazardType } from "../types/hazardType";

import { ItemType } from "../types/itemType";
import { PlanetType } from "../types/planetType";
import { RecipeResourceType, RecipeTreeType } from "../types/recipeType";
import { ResourceType } from "../types/resourceType";

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

export const resourceIds = (planet: PlanetType, gasIds: string[]): string[] => {
  let resourceIds = [] as any;
  if (planet.resources?.primary) {
    resourceIds.push(planet.resources?.primary);
  }
  if (planet.resources?.secondary) {
    resourceIds.push(planet.resources?.secondary);
  }
  if (planet.gateway.material) {
    resourceIds.push(planet.gateway.material);
  }
  if (planet?.resources?.gases) {
    resourceIds.push(gasIds);
  }
  return resourceIds.flat();
};

export const resourcesData = (
  planet: PlanetType,
  resources: ResourceType[],
  gasIds: string[],
): {
  gateway?: ResourceType;
  primary?: ResourceType;
  secondary?: ResourceType;
  gases?: ResourceType[];
} => {
  let resourcesData = {} as any;
  resourcesData["gases"] = [] as any;

  resources.forEach((r: ResourceType) => {
    switch (r.id) {
      case planet.gateway.material:
        resourcesData["gateway"] = r;
        break;
      case planet.resources.primary:
        resourcesData["primary"] = r;
        break;
      case planet.resources.secondary:
        resourcesData["secondary"] = r;
        break;
      default:
        gasIds.forEach((gasId: string) => {
          if (r.id === gasId) resourcesData["gases"].push(r);
        });
        break;
    }
  });

  return resourcesData;
};

export const imageUrl = (
  element: ItemType | PlanetType | ResourceType | HazardType,
  suffix?: string,
) => {
  if (suffix) return images[`${fileName(element)}_${suffix}`];

  return images[fileName(element)];
};

const fileName = (element: ItemType | PlanetType | ResourceType | HazardType) =>
  element.name.replaceAll(/-| /g, "_");
