import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { RESOURCES_BASE_URL } from "../util/constants";
import { fetchPlanet, fetchResources } from "../util/http";

import { ResourceType } from "../types/resourceType";
import { toCapitalizeCase } from "../util/utils";
import { GasType, PlanetType } from "../types/planetType";
import DetailHeader from "../components/shared/DetailHeader";

const PlanetPage = (): React.JSX.Element => {
  const { planet } = useRouteLoaderData("planet");

  return (
    <Suspense fallback={<p>Loading planet data...</p>}>
      <Await resolve={planet}>
        {(loadedData: { planet: PlanetType }) => {
          const loadedPlanet = loadedData.planet;
          let resourceIds = [];
          resourceIds.push(loadedPlanet.resources?.primary);
          resourceIds.push(loadedPlanet.resources?.secondary);
          const gasIds =
            loadedPlanet?.resources?.gases && loadedPlanet?.resources?.gases.map(gas => gas.id);
          resourceIds.push(gasIds);
          resourceIds = resourceIds.filter(resourceId => resourceId !== null);

          return (
            <>
              <DetailHeader element={loadedPlanet} />

              <div className="row">
                {loadedPlanet.image && (
                  <div className="rounded border-0 col-xs-12 col-md-3">
                    <img
                      src={RESOURCES_BASE_URL + loadedPlanet.image}
                      className="w-100"
                      alt={loadedPlanet.name}
                    />
                  </div>
                )}

                {Object.keys(loadedPlanet?.resources).length > 0 && (
                  <Suspense fallback={<p>Loading planets data...</p>}>
                    <Await resolve={resourcesLoader([...new Set(resourceIds.flat())])}>
                      {(loadedData: any) => {
                        const loadedResources = loadedData.resources;
                        const gatewayResource = loadedResources.find(
                          (r: ResourceType) => r.id === loadedPlanet.gateway.material,
                        );
                        const primaryResource = loadedResources.find(
                          (r: ResourceType) => r.id === loadedPlanet.resources.primary,
                        );
                        const secondaryResource = loadedResources.find(
                          (r: ResourceType) => r.id === loadedPlanet.resources.secondary,
                        );
                        const gasesResource =
                          gasIds &&
                          gasIds.map((gasId: string) => {
                            return loadedResources.find((r: ResourceType) => r.id === gasId);
                          });

                        return (
                          <div className="col-xs-12 col-md-9">
                            <table className="table table-borderless">
                              <tbody>
                                <tr>
                                  <td
                                    colSpan={2}
                                    className="text-center bg-secondary-subtle rounded"
                                  >
                                    <b>Details</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td rowSpan={2}>
                                    <b>Type</b>
                                  </td>
                                  <td colSpan={2}>
                                    {loadedPlanet.icon && (
                                      <img
                                        src={RESOURCES_BASE_URL + loadedPlanet.icon}
                                        style={{ width: "30px", height: "30px" }}
                                        alt={loadedPlanet.name}
                                        className="me-2"
                                      />
                                    )}
                                    {toCapitalizeCase(loadedPlanet.type)}
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>{loadedPlanet.typeDescription}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Day/night cycle</b>
                                  </td>
                                  <td>~ {loadedPlanet.dayNightCycle}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Difficulty</b>
                                  </td>
                                  <td>{loadedPlanet.difficulty}</td>
                                </tr>

                                <tr>
                                  <td
                                    colSpan={2}
                                    className="text-center bg-secondary-subtle rounded"
                                  >
                                    <b>Resources</b>
                                  </td>
                                </tr>
                                {primaryResource && (
                                  <tr>
                                    <td>
                                      <b>Caves</b>
                                    </td>
                                    <td>
                                      <img
                                        src={RESOURCES_BASE_URL + primaryResource.icon}
                                        alt={`${primaryResource.name} primary resource`}
                                        style={{ width: "40px", height: "40px" }}
                                      />
                                      {toCapitalizeCase(primaryResource.name)}
                                    </td>
                                  </tr>
                                )}
                                {secondaryResource && (
                                  <tr>
                                    <td>
                                      <b>Mantle/Mountains</b>
                                    </td>
                                    <td>
                                      <img
                                        src={RESOURCES_BASE_URL + secondaryResource.icon}
                                        alt={`${secondaryResource.name} secondary resource`}
                                        style={{ width: "40px", height: "40px" }}
                                      />
                                      {toCapitalizeCase(secondaryResource.name)}
                                    </td>
                                  </tr>
                                )}
                                {loadedPlanet?.resources?.gases && (
                                  <>
                                    <tr>
                                      <td
                                        rowSpan={(gasesResource && gasesResource.length + 1) || 1}
                                      >
                                        <b>Gases</b>
                                      </td>
                                    </tr>
                                    {loadedPlanet?.resources?.gases &&
                                      loadedPlanet?.resources?.gases.map((gas: GasType) => {
                                        const currentResource =
                                          gasesResource &&
                                          gasesResource.find((r: ResourceType) => r.id === gas.id);

                                        if (!currentResource) return <></>;

                                        return (
                                          <tr key={gas.id}>
                                            <td>
                                              <img
                                                src={RESOURCES_BASE_URL + currentResource.icon}
                                                alt={`${currentResource.name} gas`}
                                                style={{ width: "40px", height: "40px" }}
                                              />
                                              {toCapitalizeCase(currentResource.name)} ({gas.ppu}{" "}
                                              ppu)
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </>
                                )}
                                <tr>
                                  <td
                                    colSpan={2}
                                    className="text-center bg-secondary-subtle rounded"
                                  >
                                    <b>Power</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Sun</b>
                                  </td>
                                  <td>{loadedPlanet.sun}</td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Wind</b>
                                  </td>
                                  <td>{loadedPlanet.wind}</td>
                                </tr>
                                <tr>
                                  <td
                                    colSpan={2}
                                    className="text-center bg-secondary-subtle rounded"
                                  >
                                    <img
                                      src={RESOURCES_BASE_URL + loadedPlanet.gateway.icon}
                                      alt={`${loadedPlanet.name} gateway symbol`}
                                      style={{ width: "30px", height: "30px" }}
                                      className="me-2"
                                    />
                                    <b>Gateway</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Chamber power required</b>
                                  </td>
                                  <td>{loadedPlanet.gateway.chamberPower} U/s</td>
                                </tr>
                                {gatewayResource && (
                                  <tr>
                                    <td>
                                      <b>Engine material</b>
                                    </td>
                                    <td>
                                      <img
                                        src={RESOURCES_BASE_URL + gatewayResource.icon}
                                        alt={`${gatewayResource.name} gateway material`}
                                        style={{ width: "40px", height: "40px" }}
                                      />
                                      {toCapitalizeCase(gatewayResource.name)}
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        );
                      }}
                    </Await>
                  </Suspense>
                )}
              </div>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PlanetPage;

const planetLoader = async (id: string) => {
  return await fetchPlanet(id);
};

const resourcesLoader = async (ids: string[]) => {
  return await fetchResources(ids);
};

export const planetLoaders = async ({ params }: { params: any }) => {
  return {
    planet: await planetLoader(params.id),
  };
};
