import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ItemType } from "../types/itemType";
import { fetchItems } from "../util/http";

import Item from "../components/Item";
import SearchableList from "../components/SearchableList";

const HomePage = (): React.JSX.Element => {
  const { items } = useLoaderData();

  return (
    <>
      <h2>Items</h2>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading items...</p>}>
        <Await resolve={items}>
          {(loadedItems: ItemType[]) => {
            return (
              <SearchableList items={loadedItems} itemKeyFn={(item: ItemType) => item.id}>
                {(item: ItemType) => <Item item={item} />}
              </SearchableList>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default HomePage;

export const itemsLoader = async () => {
  return await fetchItems();
};
