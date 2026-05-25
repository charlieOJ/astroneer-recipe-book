import { PlanetType } from "../../types/planetType";

interface Props {
  planet: PlanetType;
}

const PlanetPower = ({ planet }: Props): React.JSX.Element => {
  return (
    <>
      <tr>
        <td className="row-title">
          <b>Sun</b>
        </td>

        <td>{planet.sun}</td>
      </tr>

      <tr>
        <td>
          <b>Wind</b>
        </td>

        <td>{planet.wind}</td>
      </tr>
    </>
  );
};

export default PlanetPower;
