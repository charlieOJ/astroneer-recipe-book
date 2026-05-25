import { PlanetType } from "../../types/planetType";

interface Props {
  planet: PlanetType;
}

const PlanetPower = ({ planet }: Props) => {
  return (
    <>
      <tr>
        <td>
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
