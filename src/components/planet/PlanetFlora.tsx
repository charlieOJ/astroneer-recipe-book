import { Link } from "react-router-dom";

import { HazardType } from "../../types/hazardType";
import { imageUrl } from "../../util/utils";
import { HazardInfoType, PlanetType } from "../../types/planetType";

interface Props {
  planet: PlanetType;
  hazards: HazardType[];
}

const PlanetFlora = ({ planet, hazards }: Props): React.JSX.Element => {
  const renderHazards = (): React.JSX.Element => {
    if (!hazards) return <></>;

    return <>{hazards.map((hazard: HazardType) => renderHazard(hazard))}</>;
  };

  const renderHazard = (hazard: HazardType): React.JSX.Element => {
    if (!hazard) return <></>;

    const image = imageUrl(hazard);
    const planetHazard = planet.hazards.find((h: HazardInfoType) => h.id === hazard.id);

    return (
      <tr key={hazard.id}>
        <td className="row-title">
          {image && <img src={image} alt={`${hazard.name}`} className="icon-50" />}
        </td>

        <td>
          <Link to={`/hazards/${hazard.slug}`} className="text-decoration-none me-2">
            <span className="text-capitalize">{hazard.name}</span>
          </Link>
          ({planetHazard!.location})
        </td>
      </tr>
    );
  };

  return renderHazards();
};

export default PlanetFlora;
