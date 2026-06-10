import { useTranslation } from "react-i18next";

import { ResourceType } from "../types/resourceType";

import { useDataContext } from "../context/DataContext";

import SearchableList from "../components/searchableList/SearchableList";
import Loading from "../components/shared/Loading";
import ErrorBlock from "../components/ErrorBlock";

const ResourcesPage = () => {
  const { t } = useTranslation();
  const { resources, loading, error } = useDataContext();

  if (loading) return <Loading text={t("loading.resource.msg_many")} needContainer={true} />;

  return (
    <div className="container">
      <h1>{t("resources_page.title")}</h1>

      {error ? (
        <ErrorBlock title="Something went wrong" message={error} />
      ) : (
        <SearchableList
          elements={resources}
          elementKeyFn={(resource: ResourceType) => resource.id}
          elementPath="resources"
        />
      )}
    </div>
  );
};

export default ResourcesPage;
