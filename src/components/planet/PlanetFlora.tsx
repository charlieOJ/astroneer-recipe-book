import { Link } from "react-router-dom";
import images from "../../imagesConfig";
import { HazardType } from "../../types/hazardType";

const PlanetFlora = ({ planet, hazards }: any): React.JSX.Element => {
  const renderHazards = (): React.JSX.Element => {
    if (!hazards) return <></>;

    return hazards.map((hazard: HazardType) => renderHazard(hazard));
  };

  const renderHazard = (hazard: HazardType): React.JSX.Element => {
    if (!hazard) return <></>;

    const imageUrl = images[hazard.name];
    const location = planet.hazards.find((h: HazardType) => h.id === hazard.id).location;

    return (
      <tr key={hazard.id}>
        <td className="row-title">
          {imageUrl && <img src={imageUrl} alt={`${hazard.name}`} className="icon-50" />}
        </td>

        <td>
          <Link to={`/hazards/${hazard.slug}`} className="text-decoration-none me-2">
            <span className="text-capitalize">{hazard.name}</span>
          </Link>
          ({location})
        </td>
      </tr>
    );
  };

  return renderHazards();
};

export default PlanetFlora;
