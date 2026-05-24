import { Await, useRouteLoaderData } from "react-router-dom";
import { ReactNode, Suspense } from "react";
import { OBTAIN_BY, PRINTERS, RESOURCES_BASE_URL } from "../util/constants";
import { toCapitalizeCase } from "../util/utils";

const ItemRecipeTree = ({ item }: { item: any }) => {
  const { resources } = useRouteLoaderData("item");

  const getRecipeResource = (basicResource: any, resources: any) => {
    if (!basicResource || !basicResource?.recipe) return null;
    const recipeResource = {} as any;

    basicResource.recipe?.forEach((ing: any) => {
      const currentResource = resources.find((r: any) => r.id === ing.resource);

      recipeResource[ing.resource] = { resource: currentResource, quantity: ing.quantity ?? 1 };
      recipeResource[ing.resource] = {
        ...recipeResource[ing.resource],
        recipeResource: getRecipeResource(currentResource, resources),
      };
    });
    return recipeResource;
  };

  const createBy = (recipe: any) => {
    return (
      recipe?.recipeResource && (
        <>
          <ul className="d-flex flex-column gap-3">
            {Object.keys(recipe?.recipeResource).map((resourceId: string): ReactNode => {
              const resourceData = recipe?.recipeResource[resourceId];
              const resource = resourceData?.resource;

              return (
                <li
                  key={resourceId}
                  className="list-group-item border-start border-2 border-secondary-subtle ps-1"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={RESOURCES_BASE_URL + resource?.image}
                      style={{ maxWidth: "50px" }}
                      alt={resource?.name}
                    />
                    <p className="m-0">
                      {toCapitalizeCase(resource?.name)} x{resourceData.quantity}
                      {resource?.obtainBy
                        ? ` - obtain by ${toCapitalizeCase(OBTAIN_BY[resource?.obtainBy])}`
                        : ""}
                    </p>
                  </div>
                  {createBy(resourceData)}
                </li>
              );
            })}
          </ul>
        </>
      )
    );
  };

  const recipeTreeData = (resources: any) => {
    const itemRecipeData: any = {
      itemId: item.id,
      name: item.name,
      recipeResource: getRecipeResource(item, resources),
    };

    return (
      <>
        <h3>{toCapitalizeCase(itemRecipeData.name)}</h3>
        <p>Create from : </p>
        {createBy(itemRecipeData)}
      </>
    );
  };

  return (
    <Suspense fallback={<p>Loading item recipe tree...</p>}>
      <Await resolve={resources}>
        {loadedData => {
          const loadedResources = loadedData.resources;

          return recipeTreeData(loadedResources);
        }}
      </Await>
    </Suspense>
  );
};

export default ItemRecipeTree;
