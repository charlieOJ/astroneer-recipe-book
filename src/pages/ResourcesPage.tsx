import { ResourceType } from "../types/resourceType";
import { useDataContext } from "../context/DataContext";

import SearchableList from "../components/searchableList/SearchableList";
import Loading from "../components/shared/Loading";

const ResourcesPage = () => {
  const { resources, loading } = useDataContext();

  if (loading)
    return (
      <div className="container">
        <Loading text="Loading resources..." />
      </div>
    );

  return (
    <div className="container">
      <h1>Resources</h1>

      <SearchableList
        elements={resources}
        elementKeyFn={(resource: ResourceType) => resource.id}
        elementPath="resources"
      />
    </div>
  );
};

export default ResourcesPage;
