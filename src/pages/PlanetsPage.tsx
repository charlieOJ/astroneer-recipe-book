import { Suspense } from "react";
import { fetchPlanets } from "../util/http";
import { Await, useLoaderData } from "react-router-dom";
import { PlanetType } from "../types/planetType";
import Planet from "../components/planet/Planet";
import SearchableList from "../components/searchableList/SearchableList";

const PlanetsPage = () => {
  const { planets } = useLoaderData();

  return (
    <>
      <h1>Planets</h1>

      <Suspense fallback={<p className="text-center">Loading planets...</p>}>
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
    </>
  );
};

export default PlanetsPage;

export const planetsLoader = async () => {
  return await fetchPlanets();
};
