import { Suspense } from "react";
import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";

import { RESOURCES_BASE_URL } from "../util/constants";
import { fetchItem, fetchResources } from "../util/http";

import RecipeTable from "../components/RecipeTable";

const ItemPage = () => {
  const navigate = useNavigate();
  const { item } = useRouteLoaderData("item");

  return (
    <Suspense fallback={<p>Loading item data...</p>}>
      <Await resolve={item}>
        {loadedData => {
          const loadedItem = loadedData.item;
          return (
            <>
              <div className="align-items-center d-flex">
                <button className="btn" onClick={() => navigate("../")}>
                  <i className="fa-solid fa-angle-left mb-2"></i>
                </button>
                <h2>{loadedItem.name.toUpperCase()}</h2>
              </div>
              {loadedItem.image && (
                <div className="img-thumbnail p-3 border-0">
                  <img
                    src={RESOURCES_BASE_URL + loadedItem.image}
                    className="w-25"
                    alt={loadedItem.name}
                  />
                </div>
              )}

              <RecipeTable item={loadedItem} />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default ItemPage;

export const itemLoader = async (params: any) => {
  return await fetchItem(params.id);
};

export const resourcesLoader = async () => {
  return await fetchResources();
};

export const itemLoaders = async ({ params }: { params: any }) => {
  return {
    item: await itemLoader(params),
    resources: resourcesLoader(),
  };
};
