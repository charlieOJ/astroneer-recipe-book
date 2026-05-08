import { ITEMS_BASE_URL } from "../data/items";
import RESOURCES, { RESOURCES_BASE_URL } from "../data/resources";

const Recipe = ({ item }) => {
  const recipeTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="p-2 text-start">Resource</th>
            <th className="p-2 text-end">Quantity</th>
          </tr>
        </thead>
        <tbody>{item.recipe.map((recipeItem, i) => recipeTableRow(recipeItem, i))}</tbody>
      </table>
    );
  };

  const recipeTableRow = (recipeItem, index) => {
    const currentResource = RESOURCES.filter(r => r.name === recipeItem.resource)[0];

    return (
      <tr key={index}>
        <td className="p-2 text-start">
          <img
            src={RESOURCES_BASE_URL + currentResource.icon}
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

  return (
    <div className="row">
      <h4 className="col-12">
        <img src={ITEMS_BASE_URL + item.icon} alt={`${item.name} icon`} style={{ width: "25px" }} />
        {item.name}
      </h4>

      <p className="text-small">{itemPrinter()}</p>

      <div className="col-xs-12 col-md-3">
        <img src={ITEMS_BASE_URL + item.image} alt={`${item.name}`} className="w-100" />
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
