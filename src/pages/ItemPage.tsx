import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { PRINTERS, RESOURCES_BASE_URL } from "../util/constants";
import { toCapitalizeCase } from "../util/utils";
import { fetchItem, fetchResources } from "../util/http";

import RecipeTree from "../components/RecipeTree";
import { ItemType } from "../types/itemType";
import { ResourceType } from "../types/resourceType";
import DetailHeader from "../components/shared/DetailHeader";

const ItemPage = (): React.JSX.Element => {
  const { item, resources } = useRouteLoaderData("item");

  return (
    <Suspense fallback={<p>Loading item data...</p>}>
      <Await resolve={item}>
        {(loadedData: { item: ItemType }) => {
          const loadedItem = loadedData.item;

          return (
            <>
              <DetailHeader element={loadedItem} />

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

              <Suspense fallback={<p>Loading item data...</p>}>
                <Await resolve={resources}>
                  {(loadedData: { resources: ResourceType[] }) => {
                    return <RecipeTree element={loadedItem} resources={loadedData.resources} />;
                  }}
                </Await>
              </Suspense>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default ItemPage;

const itemLoader = async (id: string) => {
  return await fetchItem(id);
};

const resourcesLoader = async () => {
  return await fetchResources();
};

export const itemLoaders = async ({ params }: { params: any }) => {
  return {
    item: await itemLoader(params.id),
    resources: resourcesLoader(),
  };
};
