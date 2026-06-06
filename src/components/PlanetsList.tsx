import { Link } from "react-router-dom";

import { PlanetType } from "../types/planetType";
import { ResourceType } from "../types/resourceType";
import { useDataContext } from "../context/DataContext";
import { imageUrl } from "../util/utils";

interface Props {
  resource: ResourceType;
}

const PlanetsList = ({ resource }: Props): React.JSX.Element => {
  const { planets } = useDataContext();

  if (!resource.planets) return <></>;
  if (Object.keys(resource.planets).length === 7) return <p>Available on all planets.</p>;

  const resourcePlanets = planets.filter((planet: PlanetType) => {
    return Object.values(resource.planets).includes(planet.id);
  });

  return (
    <>
      <h3>Found on the following planets :</h3>

      {resourcePlanets.map((planet: PlanetType) => {
        let foundWhere: string = "";
        if (resource.obtainBy !== "atmosphericCondenser") {
          foundWhere = planet.id === resource.planets.primary ? "Caves" : "Mantle/Mountains";
        }
        const icon = imageUrl(planet, "icon");

        return (
          <div key={planet.id}>
            <Link to={`/planets/${planet.slug}`} className="text-decoration-none">
              {icon && <img src={icon} className="me-2 icon-30" alt={planet.name} />}
              <span className="text-capitalize">{planet.name}</span>
            </Link>{" "}
            {foundWhere && <span>({foundWhere})</span>}
          </div>
        );
      })}
    </>
  );
};

export default PlanetsList;
