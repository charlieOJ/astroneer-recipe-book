import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { PlanetType } from "../types/planetType";
import Planet from "../components/planet/Planet";
import SearchableList from "../components/searchableList/SearchableList";
import Loading from "../components/shared/Loading";

const PlanetsPage = () => {
  const { planets } = useLoaderData();

  return (
    <div className="container">
      <h1>Planets</h1>

      <Suspense fallback={<Loading text="Loading planets..." />}>
        <Await resolve={planets}>
          {(loadedIPlanets: PlanetType[]) => {
            return (
              <SearchableList
                elements={loadedIPlanets}
                elementKeyFn={(planet: PlanetType) => planet.id}
              >
                {(planet: PlanetType) => <Planet planet={planet} />}
              </SearchableList>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default PlanetsPage;
