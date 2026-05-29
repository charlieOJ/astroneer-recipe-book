import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { ResourceType } from "../types/resourceType";
import SearchableList from "../components/searchableList/SearchableList";
import Resource from "../components/Resource";
import Loading from "../components/shared/Loading";

const ResourcesPage = () => {
  const { resources } = useLoaderData();

  return (
    <div className="container">
      <h1>Resources</h1>

      <Suspense fallback={<Loading text="Loading resources..." />}>
        <Await resolve={resources}>
          {(loadedResources: ResourceType[]) => {
            return (
              <SearchableList
                elements={loadedResources}
                elementKeyFn={(resource: ResourceType) => resource.id}
              >
                {(resource: ResourceType) => <Resource resource={resource} />}
              </SearchableList>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default ResourcesPage;
