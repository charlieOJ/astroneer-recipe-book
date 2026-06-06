import { ItemType } from "../types/itemType";
import { useDataContext } from "../context/DataContext";

import SearchableList from "../components/searchableList/SearchableList";
import Loading from "../components/shared/Loading";

const ItemsPage = (): React.JSX.Element => {
  const { items, loading } = useDataContext();

  if (loading)
    return (
      <div className="container">
        <Loading text="Loading items..." />
      </div>
    );

  return (
    <div className="container">
      <h2>Items</h2>

      <SearchableList
        elements={items}
        searchParams={["search", "tiers"]}
        elementKeyFn={(item: ItemType) => item.id}
        elementPath="items"
      />
    </div>
  );
};

export default ItemsPage;
