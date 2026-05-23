import { RESOURCES_BASE_URL } from "../App";
import useFetch from "../hooks/useFetch";
import { itemType } from "../types/itemType";
import { fetchResources } from "../util/http";
import ErrorBlock from "./ErrorBlock";

const RecipeTable = ({ item }: { item: itemType }) => {
  const resourceIds = item.recipe?.map(ing => ing.resource) || [];
  const { isFetching, error, fetchedData: resources } = useFetch(fetchResources);
  const recipeItems =
    resources?.resources.filter((resource: any) => resourceIds.includes(resource.id)) || [];

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
          <td className="text-center">{item.tier}</td>
          <td className="text-center">{item.name}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RecipeTable;
