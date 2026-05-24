import { useMemo } from "react";
import { PRINTERS, RESOURCES_BASE_URL } from "../util/constants";
import { itemType } from "../types/itemType";
import useFetch from "../hooks/useFetch";
import { fetchResources } from "../util/http";

import ErrorBlock from "./ErrorBlock";

const RecipeTable = ({ item }: { item: itemType }) => {
  const resourceIds = useMemo(() => item.recipe?.map((ing: any) => ing.resource) || [], [item]);
  const { isFetching, error, fetchedData } = useFetch(fetchResources);
  const resources = fetchedData?.resources;
  const recipeItems = resources?.filter((resource: any) => resourceIds.includes(resource.id)) || [];


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
            {isFetching && <p>Fetching recipe...</p>}
            {!isFetching && error && <ErrorBlock />}
            {!isFetching && !error && recipeItems && (
              <ul className="list-group list-group-flush">
                {item.recipe?.map((ingredient: any, i: number) => {
                  const resource = recipeItems.find((i: any) => i.id === ingredient.resource);

                  return (
                    <li key={i} className="list-group-item">
                      <div className="d-flex align-items-center">
                        {resource?.image && (
                          // <div>
                          <img
                            src={RESOURCES_BASE_URL + resource?.image}
                            style={{ maxWidth: "50px" }}
                            alt={resource?.name}
                          />
                          // </div>
                        )}

                        <p className="m-0">
                          {resource?.name} {ingredient.quantity && `x ${ingredient.quantity}`}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </td>
          <td className="text-center">{PRINTERS[item.tier - 1]}</td>
          <td className="text-center">{item.name}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RecipeTable;
