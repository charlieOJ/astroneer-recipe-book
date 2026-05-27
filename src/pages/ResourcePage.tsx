import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { OBTAIN_BY } from "../util/constants";
import { fetchPlanets, fetchResource, fetchResources } from "../util/http";
import { ResourceType } from "../types/resourceType";

import RecipeTree from "../components/RecipeTree";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetsList from "../components/PlanetsList";
import Loading from "../components/shared/Loading";

const ResourcePage = (): React.JSX.Element => {
  const { resource, resources } = useRouteLoaderData("resource");

  return (
    <div className="container">
      <Suspense fallback={<Loading text="Loading resource data..." />}>
        <Await resolve={resource}>
          {(loadedData: { resource: ResourceType }) => {
            const loadedResource = loadedData.resource;

            return (
              <>
                <DetailHeader element={loadedResource} />
                <DetailContent element={loadedResource}>
                  <p>
                    Obtain by :{" "}
                    <span className="text-capitalize">
                      {OBTAIN_BY[loadedResource?.obtainBy || 0].from}
                    </span>
                  </p>

                  <PlanetsList resource={loadedResource} />
                </DetailContent>

                {loadedResource.recipe && (
                  <Suspense fallback={<Loading text="Loading full recipe..." />}>
                    <Await resolve={resources}>
                      {(loadedData: { resources: ResourceType[] }) => {
                        return (
                          <RecipeTree element={loadedResource} resources={loadedData.resources} />
                        );
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

export default ResourcePage;

const resourceLoader = async (id: string) => {
  return await fetchResource(id);
};

const resourcesLoader = async () => {
  return await fetchResources();
};

export const planetsLoader = async (planets: string[]) => {
  return await fetchPlanets(planets);
};

export const resourceLoaders = async ({ params }: { params: any }) => {
  return {
    resource: await resourceLoader(params.id),
    resources: resourcesLoader(),
  };
};
