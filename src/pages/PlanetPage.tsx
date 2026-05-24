import { Suspense } from "react";
import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";

import { OBTAIN_BY, RESOURCES_BASE_URL } from "../util/constants";
import { fetchPlanet, fetchResources } from "../util/http";

import RecipeTree from "../components/RecipeTree";
import { ResourceType } from "../types/resourceType";
import { toCapitalizeCase } from "../util/utils";
import { GasType, PlanetType } from "../types/planetType";

const PlanetPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { planet, resources } = useRouteLoaderData("planet");

  return (
    <Suspense fallback={<p>Loading planet data...</p>}>
      <Await resolve={planet}>
        {(loadedData: { planet: PlanetType }) => {
          const loadedPlanet = loadedData.planet;

          return (
            <>
              <div className="align-items-center d-flex">
                <button className="btn" onClick={() => navigate(-1)}>
                  <i className="fa-solid fa-angle-left mb-2"></i>
                </button>
                <h2 className="d-flex gap-3 align-items-center">
                  {loadedPlanet.name.toUpperCase()}
                </h2>
              </div>

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
                <Suspense fallback={<p>Loading planet data...</p>}>
                  <Await resolve={resources}>
                    {(loadedData: { resources: ResourceType[] }) => {
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
                      const gasesResource = {} as any;
                      loadedPlanet.resources.gases &&
                        loadedPlanet.resources.gases.map((g: GasType) => {
                          return (gasesResource[g.id] = loadedResources.find(
                            (r: ResourceType) => r.id === g.id,
                          ));
                        });

                      return (
                        <div className="col-xs-12 col-md-9">
                          <table className="table table-borderless">
                            <tbody>
                              <tr>
                                <td colSpan={2} className="text-center bg-secondary-subtle rounded">
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
                                <td colSpan={2} className="text-center bg-secondary-subtle rounded">
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
                                    <td rowSpan={Object.keys(gasesResource).length + 1}>
                                      <b>Gases</b>
                                    </td>
                                  </tr>
                                  {loadedPlanet.resources.gases.map((gas: GasType) => {
                                    const currentGas = gasesResource[gas.id];
                                    const currentResource = loadedResources.find(
                                      (r: ResourceType) => r.id === gas.id,
                                    );

                                    if (!currentResource) return <></>;

                                    return (
                                      <tr key={currentGas.id}>
                                        <td>
                                          <img
                                            src={RESOURCES_BASE_URL + currentResource.icon}
                                            alt={`${currentResource.name} gas`}
                                            style={{ width: "40px", height: "40px" }}
                                          />
                                          {toCapitalizeCase(currentResource.name)} ({gas.ppu} ppu)
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
                              <tr>
                                <td colSpan={2} className="text-center bg-secondary-subtle rounded">
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
                                <td colSpan={2} className="text-center bg-secondary-subtle rounded">
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

const resourcesLoader = async () => {
  return await fetchResources();
};

export const planetLoaders = async ({ params }: { params: any }) => {
  return {
    planet: await planetLoader(params.id),
    resources: resourcesLoader(),
  };
};
