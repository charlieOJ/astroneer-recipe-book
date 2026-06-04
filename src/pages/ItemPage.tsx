import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { PRINTERS } from "../util/constants";

import RecipeTree from "../components/recipeTree/RecipeTree";
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
                    Craft on :
                    <span className="text-capitalize ms-2">
                      {loadedItem.tier.map((tier: number): string => PRINTERS[tier]).join(" / ")}
                    </span>
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
