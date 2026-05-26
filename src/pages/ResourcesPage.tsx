import { Suspense } from "react";
import { fetchResources } from "../util/http";
import { Await, useLoaderData } from "react-router-dom";
import { ResourceType } from "../types/resourceType";
import SearchableList from "../components/searchableList/SearchableList";
import Resource from "../components/Resource";

const ResourcesPage = () => {
  const { resources } = useLoaderData();

  return (
    <div className="container">
      <h1>Resources</h1>

      <Suspense fallback={<p className="text-center">Loading resources...</p>}>
        <Await resolve={resources}>
          {(loadedIResources: ResourceType[]) => {
            return (
              <SearchableList
                elements={loadedIResources}
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

export const resourcesLoader = async () => {
  return await fetchResources();
};
