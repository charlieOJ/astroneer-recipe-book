import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchItem } from "../util/http";
import { RESOURCES_BASE_URL } from "../App";

const ItemPage = () => {
  const navigate = useNavigate();
  const { item } = useLoaderData();

  return (
    <>
      <button onClick={() => navigate("../")}>Back</button>
      <h2>{item.name.toUpperCase()}</h2>

      {item.image && (
        <div className="img-thumbnail p-3 border-0">
          <img src={RESOURCES_BASE_URL + item.image} className="w-25" alt={item.name} />
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Input</th>
            <th>Module</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                {item?.recipe.map((ingredient: any, i: number) => {
                  return (
                    <li key={i}>
                      {ingredient.resource} {ingredient.quantity}
                    </li>
                  );
                })}
              </ul>
            </td>
            <td>{item?.tier}</td>
            <td>{item.name}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ItemPage;

export const itemLoader = async ({ params }: { params: any }) => {
  return await fetchItem(params.id);
};
