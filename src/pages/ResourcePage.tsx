import { Suspense } from "react";
import { Await, Link, useRouteLoaderData } from "react-router-dom";

import { OBTAIN_BY, RESOURCES_BASE_URL } from "../util/constants";
import { fetchPlanets, fetchResource, fetchResources } from "../util/http";
import { toCapitalizeCase } from "../util/utils";
import { ResourceType } from "../types/resourceType";
import { PlanetType } from "../types/planetType";

import RecipeTree from "../components/RecipeTree";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";

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
                  {loadedResource.planets && (
                    <Suspense>
                      <Await resolve={planetsLoader(loadedResource.planets)}>
                        {(loadData: any) => {
                          const planets = loadData.planets;

                          if (planets.length === 7) return <p>Available on all planets.</p>;

                          return (
                            <>
                              <h3>Found on the following planets :</h3>
                              {planets.map((planet: PlanetType) => {
                                return (
                                  <div key={planet.id}>
                                    <Link to={`/planets/${planet.id}`}>
                                      <img
                                        src={RESOURCES_BASE_URL + planet.icon}
                                        style={{ width: "40px", height: "40px" }}
                                        className="me-2"
                                        alt={planet.name}
                                      />
                                      {toCapitalizeCase(planet.name)}
                                    </Link>
                                  </div>
                                );
                              })}
                            </>
                          );
                        }}
                      </Await>
                    </Suspense>
                  )}
                </DetailContent>

                <Suspense fallback={<p>Loading resources...</p>}>
                  <Await resolve={resources}>
                    {(loadedData: { resources: ResourceType[] }) => {
                      return (
                        <RecipeTree element={loadedResource} resources={loadedData.resources} />
                      );
                    }}
                  </Await>
                </Suspense>
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

const planetsLoader = async (planets: string[]) => {
  return await fetchPlanets(planets);
};

export const resourceLoaders = async ({ params }: { params: any }) => {
  return {
    resource: await resourceLoader(params.id),
    resources: resourcesLoader(),
  };
};
