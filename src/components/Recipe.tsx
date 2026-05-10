import { JSX } from "react";

import useFetch from "../hooks/useFetch";
import { fetchResources } from "../http";

import ErrorBlock from "./ErrorBlock";

export const BASE_URL = "https://static.wikia.nocookie.net/astroneer_gamepedia/images/";

const Recipe = ({ item }: { item: any }): JSX.Element => {
  const { isFetching, error, fetchedData: resources } = useFetch(fetchResources, []);

  const recipeTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="p-2 text-start">Resource</th>
            <th className="p-2 text-end">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {item.recipe.map((recipeItem: any, i: number) => recipeTableRow(recipeItem, i))}
        </tbody>
      </table>
    );
  };

  const recipeTableRow = (recipeItem: any, index: number) => {
    if (!resources || resources.length === 0) return;

    const currentResource = resources.filter((r: any) => r.name === recipeItem.resource)[0];

    return (
      <tr key={index}>
        <td className="p-2 text-start">
          <img
            src={BASE_URL + currentResource.icon}
            alt={`${recipeItem.resource} icon`}
            style={{ width: "20px" }}
          />
          {currentResource.name}
        </td>
        <td className="p-2 text-end">{recipeItem.quantity > 0 ? recipeItem.quantity : 1}</td>
      </tr>
    );
  };

  const itemPrinter = () => {
    switch (item.tier) {
      case 1:
        return "Backpack printer / Small printer";
      case 2:
        return "Small printer";
      case 3:
        return "Medium printer";
      case 4:
        return "Large printer";

      default:
        return "Backpack printer / Small printer";
    }
  };

  if (isFetching)
    return (
      <div className="row">
        <p className="col-12">Fetching resources...</p>
      </div>
    );

  if (error) return <ErrorBlock title="Something went wrong." message={error} />;

  return (
    <div className="row">
      <h4 className="col-12">
        <img src={BASE_URL + item.icon} alt={`${item.name} icon`} style={{ width: "25px" }} />
        {item.name}
      </h4>

      <p className="text-small">{itemPrinter()}</p>

      <div className="col-xs-12 col-md-3">
        <img src={BASE_URL + item.image} alt={`${item.name}`} className="w-100" />
      </div>
      <div className="col-xs-12 col-md-9">
        <div className="row">
          <div className="col-xs-12 col-md-6">{recipeTable()}</div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
