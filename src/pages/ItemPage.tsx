import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { PRINTERS } from "../util/constants";
import { fetchItem, fetchResources } from "../util/http";

import RecipeTree from "../components/RecipeTree";
import { ItemType } from "../types/itemType";
import { ResourceType } from "../types/resourceType";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import Loading from "../components/shared/Loading";

const ItemPage = (): React.JSX.Element => {
  const { item, resources } = useRouteLoaderData("item");

  return (
    <div className="container">
      <Suspense fallback={<Loading text="Loading item data..." />}>
        <Await resolve={item}>
          {(loadedData: { item: ItemType }) => {
            const loadedItem = loadedData.item;

            return (
              <>
                <DetailHeader element={loadedItem} />

                <DetailContent element={loadedItem}>
                  <p>
                    Craft on :{" "}
                    <span className="text-capitalize">{PRINTERS[loadedItem.tier - 1]}</span>
                  </p>
                  {loadedItem.cost && (
                    <p>
                      Unlock cost :
                      {loadedItem.cost === "unlock" ? " unlock" : ` ${loadedItem.cost} Bytes`}
                    </p>
                  )}
                </DetailContent>

                {loadedItem.recipe && (
                  <Suspense fallback={<Loading text="Loading item data..." />}>
                    <Await resolve={resources}>
                      {(loadedData: { resources: ResourceType[] }) => {
                        return <RecipeTree element={loadedItem} resources={loadedData.resources} />;
                      }}
                    </Await>
                  </Suspense>
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
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
