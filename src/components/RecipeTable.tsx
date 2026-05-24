import { Suspense, useMemo } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { PRINTERS, RESOURCES_BASE_URL } from "../util/constants";
import { itemType } from "../types/itemType";

const RecipeTable = ({ item }: { item: itemType }) => {
  const { resources } = useRouteLoaderData("item");
  const resourceIds = useMemo(() => item.recipe?.map((ing: any) => ing.resource) || [], [item]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Input</th>
          <th className="text-center">Module</th>
          <th className="text-center">Output</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <Suspense fallback={<p>Loading item recipe...</p>}>
              <Await resolve={resources}>
                {loadedData => {
                  const loadedResources = loadedData.resources;
                  const recipeItems =
                    loadedResources.filter((resource: any) => resourceIds.includes(resource.id)) ||
                    [];

                  return (
                    <ul className="list-group list-group-flush">
                      {item.recipe?.map((ingredient: any, i: number) => {
                        const resource = recipeItems.find((i: any) => i.id === ingredient.resource);

                        return (
                          <li key={i} className="list-group-item">
                            <div className="d-flex align-items-center">
                              {resource?.image && (
                                <img
                                  src={RESOURCES_BASE_URL + resource?.image}
                                  style={{ maxWidth: "50px" }}
                                  alt={resource?.name}
                                />
                              )}

                              <p className="m-0">
                                {resource?.name} {ingredient.quantity && `x ${ingredient.quantity}`}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }}
              </Await>
            </Suspense>
          </td>
          <td className="text-center">{PRINTERS[item.tier - 1]}</td>
          <td className="text-center">{item.name}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RecipeTable;
