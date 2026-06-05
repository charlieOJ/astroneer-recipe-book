import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { HazardType } from "../types/hazardType";

import Loading from "../components/shared/Loading";
import SearchableList from "../components/searchableList/SearchableList";

const HazardsPage = (): React.JSX.Element => {
  const { hazards } = useLoaderData();

  return (
    <div className="container">
      <h2>Hazards</h2>

      <Suspense fallback={<Loading text="Loading hazards..." />}>
        <Await resolve={hazards}>
          {(loadedHazards: HazardType[]) => {
            return (
              <SearchableList
                elements={loadedHazards}
                searchParams={["search", "hazardTypes"]}
                elementKeyFn={(hazard: HazardType) => hazard.id}
                elementPath="hazards"
              />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default HazardsPage;
