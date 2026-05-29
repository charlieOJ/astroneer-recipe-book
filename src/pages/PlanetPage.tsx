import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { PlanetType } from "../types/planetType";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetInfo from "../components/planet/PlanetInfo";
import Loading from "../components/shared/Loading";

const PlanetPage = (): React.JSX.Element => {
  const { planet } = useRouteLoaderData("planet");

  return (
    <div className="container">
      <Suspense fallback={<Loading text="Loading planet data..." />}>
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
