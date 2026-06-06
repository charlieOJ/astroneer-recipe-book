import { Link } from "react-router-dom";

import { HazardType } from "../../types/hazardType";
import { imageUrl } from "../../util/utils";
import { useDataContext } from "../../context/DataContext";
import { HazardInfoType } from "../../types/planetType";

const PlanetFlora = ({ planet }: any): React.JSX.Element => {
  const { hazards } = useDataContext();

  const renderHazards = (): React.JSX.Element => {
    return (
      <>
        {planet.hazards.map((planetHazard: HazardInfoType) => {
          const currentHazard = hazards.find((h: HazardType) => h.id === planetHazard.id) || null;
          return renderHazard(planetHazard, currentHazard);
        })}
      </>
    );
  };

  const renderHazard = (
    hazard: HazardInfoType,
    currentHazard: HazardType | null,
  ): React.JSX.Element => {
    if (!currentHazard) return <></>;

    const image = imageUrl(currentHazard);

    return (
      <tr key={hazard.id}>
        <td className="row-title">
          {image && <img src={image} alt={`${currentHazard.name}`} className="icon-50" />}
        </td>

        <td>
          <Link to={`/hazards/${currentHazard.slug}`} className="text-decoration-none me-2">
            <span className="text-capitalize">{currentHazard.name}</span>
          </Link>
          ({hazard.location})
        </td>
      </tr>
    );
  };

  return renderHazards();
};

export default PlanetFlora;
