import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { fetchPlanet, fetchResources } from "../util/http";

import { PlanetType } from "../types/planetType";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetInfo from "../components/planet/PlanetInfo";

const PlanetPage = (): React.JSX.Element => {
  const { planet } = useRouteLoaderData("planet");

  return (
    <div className="container">
      <Suspense fallback={<p>Loading planet data...</p>}>
        <Await resolve={planet}>
          {(loadedData: { planet: PlanetType }) => {
            const loadedPlanet = loadedData.planet;

            return (
              <>
                <DetailHeader element={loadedPlanet} />
                <DetailContent element={loadedPlanet}>
                  <PlanetInfo planet={loadedPlanet} />
                </DetailContent>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default PlanetPage;

const planetLoader = async (id: string) => {
  return await fetchPlanet(id);
};

export const resourcesLoader = async (ids: string[]) => {
  return await fetchResources(ids);
};

export const planetLoaders = async ({ params }: { params: any }) => {
  return {
    planet: await planetLoader(params.id),
  };
};
