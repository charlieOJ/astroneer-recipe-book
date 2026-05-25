import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { OBTAIN_BY } from "../util/constants";
import { fetchPlanets, fetchResource, fetchResources } from "../util/http";
import { toCapitalizeCase } from "../util/utils";
import { ResourceType } from "../types/resourceType";

import RecipeTree from "../components/RecipeTree";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetsList from "../components/resource/PlanetsList";

const ResourcePage = (): React.JSX.Element => {
  const { resource, resources } = useRouteLoaderData("resource");

  return (
    <>
      <Suspense fallback={<p>Loading resource data...</p>}>
        <Await resolve={resource}>
          {(loadedData: { resource: ResourceType }) => {
            const loadedResource = loadedData.resource;

            return (
              <>
                <DetailHeader element={loadedResource} />
                <DetailContent element={loadedResource}>
                  <p>
                    Obtain by : {toCapitalizeCase(OBTAIN_BY[loadedResource?.obtainBy || 0].from)}
                  </p>

                  <PlanetsList resource={loadedResource} />
                </DetailContent>

                {loadedResource.recipe && (
                  <Suspense fallback={<p>Loading full recipe...</p>}>
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
    </>
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
