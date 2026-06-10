import { useTranslation } from "react-i18next";

import { ItemType } from "../types/itemType";
import { useDataContext } from "../context/DataContext";

import SearchableList from "../components/searchableList/SearchableList";
import Loading from "../components/shared/Loading";
import ErrorBlock from "../components/ErrorBlock";

const ItemsPage = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { items, loading, error } = useDataContext();

  if (loading) return <Loading text={t("loading.item.msg_many")} needContainer={true} />;

  return (
    <div className="container">
      <h2>{t("items_page.title")}</h2>

      {error ? (
        <ErrorBlock title="Something went wrong" message={error} />
      ) : (
        <SearchableList
          elements={items}
          searchParams={["search", "tiers"]}
          elementKeyFn={(item: ItemType) => item.id}
          elementPath="items"
        />
      )}
    </div>
  );
};

export default ItemsPage;
