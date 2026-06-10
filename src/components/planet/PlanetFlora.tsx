import { Link, useParams } from "react-router-dom";

import { HazardType } from "../../types/hazardType";
import { HazardInfoType, PlanetType } from "../../types/planetType";

import { useDataContext } from "../../context/DataContext";
import { I18n, imageUrl, nameNoSpace } from "../../util/utils";

interface Props {
  planet: PlanetType;
}
const PlanetFlora = ({ planet }: Props): React.JSX.Element => {
  const { lng } = useParams();
  const { hazards } = useDataContext();

  const renderHazard = (
    hazard: HazardInfoType,
    currentHazard: HazardType | null,
  ): React.JSX.Element => {
    if (!currentHazard) return <></>;

    const image = imageUrl(currentHazard);
    const planetHazard = planet.hazards.find((h: HazardInfoType) => h.id === hazard.id);
    const hazardName = I18n(`hazard.${currentHazard.name}.name`, currentHazard.name);

    return (
      <tr key={hazard.id}>
        <td className="row-title">
          {image && <img src={image} alt={`${hazardName}`} className="icon-50" />}
        </td>

        <td>
          <Link
            to={`/${lng ? lng + "/" : ""}hazards/${currentHazard.slug}`}
            className="text-decoration-none me-2"
          >
            <span className="text-capitalize">{hazardName}</span>
          </Link>
          (
          {I18n(`planet_page.flora.${nameNoSpace(planetHazard!.location)}`, planetHazard!.location)}
          )
        </td>
      </tr>
    );
  };

  return (
    <>
      {planet.hazards.map((planetHazard: HazardInfoType) => {
        const currentHazard = hazards.find((h: HazardType) => h.id === planetHazard.id) || null;

        return renderHazard(planetHazard, currentHazard);
      })}
    </>
  );
};

export default PlanetFlora;
