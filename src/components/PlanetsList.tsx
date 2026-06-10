import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PlanetType } from "../types/planetType";
import { ResourceType } from "../types/resourceType";

import { useDataContext } from "../context/DataContext";
import { imageUrl } from "../util/utils";

interface Props {
  resource: ResourceType;
}

const PlanetsList = ({ resource }: Props): React.JSX.Element => {
  const { lng } = useParams();
  const { t } = useTranslation();
  const { planets } = useDataContext();

  if (!resource.planets) return <></>;
  if (Object.keys(resource.planets).length === 7) return <p>{t("planets_list.all")}</p>;

  const resourcePlanets = planets.filter((planet: PlanetType) => {
    return Object.values(resource.planets).includes(planet.id);
  });

  return (
    <>
      <h3>{t("planets_list.title")}</h3>

      {resourcePlanets.map((planet: PlanetType) => {
        let foundWhere: string = "";
        if (resource.obtainBy !== "atmosphericCondenser") {
          foundWhere =
            planet.id === resource.planets.primary
              ? t("planets_list.caves")
              : t("planets_list.mountains");
        }
        const icon = imageUrl(planet, "icon");

        return (
          <div key={planet.id}>
            <Link
              to={`/${lng ? lng + "/" : ""}planets/${planet.slug}`}
              className="text-decoration-none"
            >
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
