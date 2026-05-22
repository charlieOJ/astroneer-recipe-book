import { JSX, Suspense } from "react";

import { itemType } from "../types/itemType";

import Item from "../components/Item";
import SearchableList from "../components/SearchableList";
import { fetchItems } from "../util/http";
import { Await, useLoaderData } from "react-router-dom";

const HomePage = (): JSX.Element => {
  const { items } = useLoaderData();

  return (
    <>
      <h2>Items</h2>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading items...</p>}>
        <Await resolve={items}>
          {loadedItems => {
            return (
              <SearchableList items={loadedItems} itemKeyFn={(item: itemType) => item.id}>
                {(item: itemType) => <Item item={item} />}
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
