import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { fetchItems } from "../util/http";
import { ItemType } from "../types/itemType";

import SearchableList from "../components/searchableList/SearchableList";
import Item from "../components/Item";
import Loading from "../components/shared/Loading";

const ItemsPage = (): React.JSX.Element => {
  const { items } = useLoaderData();

  return (
    <div className="container">
      <h2>Items</h2>

      <Suspense fallback={<Loading text="Loading items..." />}>
        <Await resolve={items}>
          {(loadedItems: ItemType[]) => {
            return (
              <SearchableList
                elements={loadedItems}
                searchParams={["search", "tiers"]}
                elementKeyFn={(item: ItemType) => item.id}
              >
                {(item: ItemType) => <Item item={item} />}
              </SearchableList>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default ItemsPage;

export const itemsLoader = async () => {
  return await fetchItems();
};
