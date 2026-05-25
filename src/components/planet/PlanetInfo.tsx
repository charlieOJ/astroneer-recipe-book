import { Suspense } from "react";
import { Await } from "react-router-dom";

import { resourcesLoader } from "../../pages/PlanetPage";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { RESOURCES_BASE_URL } from "../../util/constants";

import PlanetDetail from "./PlanetDetail";
import PlanetResources from "./PlanetResources";
import PlanetPower from "./PlanetPower";
import PlanetGateway from "./PlanetGateway";
import PlanetInfoTitle from "./PlanetInfoTitle";

interface Props {
  planet: PlanetType;
}

const PlanetInfo = ({ planet }: Props): React.JSX.Element => {
  const gasIds = planet.resources?.gases?.map(gas => gas.id) || [];

  const resourceIds = (): string[] => {
    let resourceIds = [] as any;
    if (planet.resources?.primary) {
      resourceIds.push(planet.resources?.primary);
    }
    if (planet.resources?.secondary) {
      resourceIds.push(planet.resources?.secondary);
    }
    if (planet?.resources?.gases) {
      resourceIds.push(gasIds);
    }
    return resourceIds.flat();
  };

  const resourcesData = (resources: ResourceType[]) => {
    let resourcesData = {} as any;
    resourcesData["gases"] = [] as any;

    resources.forEach((r: ResourceType) => {
      switch (r.id) {
        case planet.gateway.material:
          resourcesData["gateway"] = r;
          break;
        case planet.resources.primary:
          resourcesData["primary"] = r;
          break;
        case planet.resources.secondary:
          resourcesData["secondary"] = r;
          break;
        default:
          gasIds.forEach((gasId: string) => {
            if (r.id === gasId) resourcesData["gases"].push(r);
          });
          break;
      }
    });

    return resourcesData;
  };

  if (Object.keys(planet?.resources).length === 0) return <></>;

  return (
    <Suspense fallback={<p>Loading planets data...</p>}>
      <Await resolve={resourcesLoader([...new Set(resourceIds())])}>
        {(loadedData: any) => {
          const resources = resourcesData(loadedData.resources);

          return (
            <table className="table table-borderless planet">
              <tbody>
                <PlanetInfo.Title>Details</PlanetInfo.Title>
                <PlanetDetail planet={planet} />

                <PlanetInfo.Title>Resources</PlanetInfo.Title>
                <PlanetResources planet={planet} resources={resources} />

                <PlanetInfo.Title>Power</PlanetInfo.Title>
                <PlanetPower planet={planet} />

                <PlanetInfo.Title>
                  <img
                    src={RESOURCES_BASE_URL + planet.gateway.icon}
                    alt={`${planet.name} gateway symbol`}
                    className="me-2 icon-30"
                  />
                  Gateway
                </PlanetInfo.Title>
                <PlanetGateway planet={planet} resources={resources} />
              </tbody>
            </table>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PlanetInfo;

PlanetInfo.Title = PlanetInfoTitle;
