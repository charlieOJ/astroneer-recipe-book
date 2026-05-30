import { Suspense } from "react";
import { Await, Link } from "react-router-dom";

import { PlanetType } from "../types/planetType";
import { ResourceType } from "../types/resourceType";
import { RESOURCES_BASE_URL } from "../util/constants";
import { planetsLoader } from "../util/loaders";
import Loading from "./shared/Loading";

interface Props {
  resource: ResourceType;
}

const PlanetsList = ({ resource }: Props): React.JSX.Element => {
  if (!resource.planets) return <></>;
  if (Object.keys(resource.planets).length === 7) return <p>Available on all planets.</p>;

  const planetIds = Object.values(resource.planets);

  return (
    <Suspense fallback={<Loading text="Loading planets ..." />}>
      <Await resolve={planetsLoader([...new Set(planetIds)])}>
        {(loadData: any) => {
          const planets = loadData.planets;

          return (
            <>
              <h3>Found on the following planets :</h3>

              {planets.map((planet: PlanetType) => {
                let foundWhere: string = "Mantle/Mountains";

                if (planet.id === resource.planets.primary) {
                  foundWhere = "Caves";
                }

                return (
                  <div key={planet.id}>
                    <Link to={`/planets/${planet.slug}`} className="text-decoration-none">
                      <img
                        src={RESOURCES_BASE_URL + planet.icon}
                        className="me-2 icon-30"
                        alt={planet.name}
                      />
                      <span className="text-capitalize">{planet.name}</span>
                    </Link>{" "}
                    ({foundWhere})
                  </div>
                );
              })}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PlanetsList;
