import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { RESOURCES_BASE_URL } from "../../util/constants";
import { toCapitalizeCase } from "../../util/utils";

interface Props {
  planet: PlanetType;
  resources: {
    gateway?: ResourceType;
  };
}

const PlanetGateway = ({ planet, resources }: Props): React.JSX.Element => {
  const renderGatewayResource = (): React.JSX.Element => {
    if (!resources.gateway) return <></>;

    return (
      <tr>
        <td>
          <b>Engine material</b>
        </td>

        <td>
          <img
            src={RESOURCES_BASE_URL + resources.gateway.icon}
            alt={`${resources.gateway.name} gateway material`}
            className="icon-40"
          />

          {toCapitalizeCase(resources.gateway.name)}
        </td>
      </tr>
    );
  };

  return (
    <>
      <tr>
        <td className="row-title">
          <b>Chamber power required</b>
        </td>

        <td>{planet.gateway.chamberPower} U/s</td>
      </tr>

      {renderGatewayResource()}
    </>
  );
};

export default PlanetGateway;
