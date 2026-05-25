import { Await, Link } from "react-router-dom";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { RESOURCES_BASE_URL } from "../../util/constants";
import { toCapitalizeCase } from "../../util/utils";
import { planetsLoader } from "../../pages/ResourcePage";
import { Suspense } from "react";

interface Props {
  resource: ResourceType;
}

const PlanetsList = ({ resource }: Props): React.JSX.Element => {
  if (!resource.planets) return <></>;
  if (resource.planets.length === 7) return <p>Available on all planets.</p>;

  return (
    <Suspense fallback={<p>Loading planets ...</p>}>
      <Await resolve={planetsLoader(resource.planets)}>
        {(loadData: any) => {
          const planets = loadData.planets;

          return (
            <>
              <h3>Found on the following planets :</h3>

              {planets.map((planet: PlanetType) => {
                return (
                  <div key={planet.id}>
                    <Link to={`/planets/${planet.id}`}>
                      <img
                        src={RESOURCES_BASE_URL + planet.icon}
                        style={{ width: "40px", height: "40px" }}
                        className="me-2"
                        alt={planet.name}
                      />
                      {toCapitalizeCase(planet.name)}
                    </Link>
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
