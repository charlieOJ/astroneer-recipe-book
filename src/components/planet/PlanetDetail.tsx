import { PlanetType } from "../../types/planetType";
import { RESOURCES_BASE_URL } from "../../util/constants";
import { toCapitalizeCase } from "../../util/utils";

interface Props {
  planet: PlanetType;
}

const PlanetDetail = ({ planet }: Props): React.JSX.Element => {
  return (
    <>
      <tr>
        <td rowSpan={2} className="row-title">
          <b>Type</b>
        </td>

        <td colSpan={2}>
          {planet.icon && (
            <img
              src={RESOURCES_BASE_URL + planet.icon}
              alt={planet.name}
              className="me-2 icon-30"
            />
          )}
          {toCapitalizeCase(planet.type)}
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
