import { Suspense } from "react";
import { Await } from "react-router-dom";

import { PlanetType } from "../../types/planetType";

import { hazardsLoader, resourcesLoader } from "../../util/loaders";
import { RESOURCES_BASE_URL } from "../../util/constants";
import { resourceIds, resourcesData } from "../../util/utils";

import Loading from "../shared/Loading";

import PlanetDetail from "./PlanetDetail";
import PlanetResources from "./PlanetResources";
import PlanetPower from "./PlanetPower";
import PlanetGateway from "./PlanetGateway";
import PlanetInfoTitle from "./PlanetInfoTitle";
import PlanetFlora from "./PlanetFlora";

interface Props {
  planet: PlanetType;
}

const PlanetInfo = ({ planet }: Props): React.JSX.Element => {
  if (Object.keys(planet?.resources).length === 0) return <></>;

  const gasIds = planet.resources?.gases?.map(gas => gas.id) || [];
  const hazardIds = planet.hazards.map(hazard => hazard.id) || [];

  return (
    <table className="table table-borderless planet">
      <tbody>
        <PlanetInfo.Title>Details</PlanetInfo.Title>
        <PlanetDetail planet={planet} />

        <PlanetInfo.Title>Power</PlanetInfo.Title>
        <PlanetPower planet={planet} />

        <Suspense fallback={<Loading text="Loading planet resources data..." isOnTable={true} />}>
          <Await resolve={resourcesLoader([...new Set(resourceIds(planet, gasIds))])}>
            {(loadedData: any) => {
              const resources = resourcesData(planet, loadedData.resources, gasIds);

              return (
                <>
                  <PlanetInfo.Title>Resources</PlanetInfo.Title>
                  <PlanetResources planet={planet} resources={resources} />

                  <PlanetInfo.Title>
                    <img
                      src={RESOURCES_BASE_URL + planet.gateway.icon}
                      alt={`${planet.name} gateway symbol`}
                      className="me-2 icon-30"
                    />
                    Gateway
                  </PlanetInfo.Title>
                  <PlanetGateway planet={planet} resources={resources} />
                </>
              );
            }}
          </Await>
        </Suspense>

        <Suspense fallback={<Loading text="Loading planet hazards data..." isOnTable={true} />}>
          <Await resolve={hazardsLoader(hazardIds)}>
            {(loadedData: any) => {
              return (
                <>
                  <PlanetInfo.Title>Flora</PlanetInfo.Title>
                  <PlanetFlora planet={planet} hazards={loadedData.hazards} />
                </>
              );
            }}
          </Await>
        </Suspense>
      </tbody>
    </table>
  );
};

export default PlanetInfo;

PlanetInfo.Title = PlanetInfoTitle;
