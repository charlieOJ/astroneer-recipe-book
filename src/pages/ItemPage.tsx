import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchItem } from "../util/http";
import { RESOURCES_BASE_URL } from "../App";
import RecipeTable from "../components/RecipeTable";

const ItemPage = () => {
  const navigate = useNavigate();
  const { item } = useLoaderData();

  return (
    <>
      <div className="align-items-center d-flex">
        <button className="btn" onClick={() => navigate("../")}>
          <i className="fa-solid fa-angle-left mb-2"></i>
        </button>
        <h2>{item.name.toUpperCase()}</h2>
      </div>
      {item.image && (
        <div className="img-thumbnail p-3 border-0">
          <img src={RESOURCES_BASE_URL + item.image} className="w-25" alt={item.name} />
        </div>
      )}
      <RecipeTable item={item} />
    </>
  );
};

export default ItemPage;

export const itemLoader = async ({ params }: { params: any }) => {
  return await fetchItem(params.id);
};
