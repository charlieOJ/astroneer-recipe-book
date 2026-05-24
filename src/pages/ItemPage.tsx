import { Suspense } from "react";
import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import { PRINTERS, RESOURCES_BASE_URL } from "../util/constants";
import { fetchItem, fetchResources } from "../util/http";
import ItemRecipeTree from "../components/ItemRecipeTree";
import { toCapitalizeCase } from "../util/utils";

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
                <h2 className="d-flex gap-3">
                  {loadedItem.icon && (
                    <img
                      src={RESOURCES_BASE_URL + loadedItem.icon}
                      style={{ width: "30px" }}
                      alt={loadedItem.name}
                    />
                  )}
                  {loadedItem.name.toUpperCase()}
                </h2>
              </div>

              <div className="row">
                {loadedItem.image && (
                  <div className="img-thumbnail p-3 border-0 col-xs-12 col-md-4">
                    <img
                      src={RESOURCES_BASE_URL + loadedItem.image}
                      className="w-100"
                      alt={loadedItem.name}
                    />
                  </div>
                )}
                <div className="col-xs-12 col-md-8">
                  <p>Craft on : {toCapitalizeCase(PRINTERS[loadedItem.tier - 1])}</p>
                  <p>Unlock cost : {loadedItem.cost} Bytes</p>
                </div>
              </div>

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Show full recipe tree</Accordion.Header>
                  <Accordion.Body>
                    <ItemRecipeTree item={loadedItem} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
