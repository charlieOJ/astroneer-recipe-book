import { Suspense } from "react";
import { Await } from "react-router-dom";

import { resourcesLoader } from "../../pages/PlanetPage";
import { PlanetType } from "../../types/planetType";
import { RESOURCES_BASE_URL } from "../../util/constants";

import PlanetDetail from "./PlanetDetail";
import PlanetResources from "./PlanetResources";
import PlanetPower from "./PlanetPower";
import PlanetGateway from "./PlanetGateway";
import PlanetInfoTitle from "./PlanetInfoTitle";
import { resourceIds, resourcesData } from "../../util/utils";
import Loading from "../shared/Loading";

interface Props {
  planet: PlanetType;
}

const PlanetInfo = ({ planet }: Props): React.JSX.Element => {
  if (Object.keys(planet?.resources).length === 0) return <></>;

  const gasIds = planet.resources?.gases?.map(gas => gas.id) || [];

  return (
    <Suspense fallback={<Loading text="Loading planets data..." />}>
      <Await resolve={resourcesLoader([...new Set(resourceIds(planet, gasIds))])}>
        {(loadedData: any) => {
          const resources = resourcesData(planet, loadedData.resources, gasIds);

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
