import { PlanetType } from "../../types/planetType";
import images from "../../imagesConfig";

interface Props {
  planet: PlanetType;
}

const PlanetDetail = ({ planet }: Props): React.JSX.Element => {
  const imageUrl = images[`${planet.name}_icon`];

  return (
    <>
      <tr>
        <td rowSpan={2} className="row-title">
          <b>Type</b>
        </td>

        <td colSpan={2}>
          {imageUrl && <img src={imageUrl} alt={`${planet.name} icon`} className="me-2 icon-30" />}
          <span className="text-capitalize">{planet.type}</span>
        </td>
      </tr>

      <tr>
        <td colSpan={2}>{planet.typeDescription}</td>
      </tr>

      <tr>
        <td className="row-title">
          <b>Day/night cycle</b>
        </td>
        <td>~ {planet.dayNightCycle}</td>
      </tr>

      <tr>
        <td className="row-title">
          <b>Difficulty</b>
        </td>
        <td>{planet.difficulty}</td>
      </tr>
    </>
  );
};

export default PlanetDetail;
