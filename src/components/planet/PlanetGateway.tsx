import { Link } from "react-router-dom";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import images from "../../imagesConfig";

interface Props {
  planet: PlanetType;
  resources: {
    gateway?: ResourceType;
  };
}

const PlanetGateway = ({ planet, resources }: Props): React.JSX.Element => {
  const renderGatewayResource = (): React.JSX.Element => {
    if (!resources.gateway) return <></>;

    const resourceName = resources.gateway.name.replaceAll(" ", "_");
    const imageUrl = images[`${resourceName}_icon`];

    return (
      <tr>
        <td>
          <b>Engine material</b>
        </td>

        <td>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`${resources.gateway.name} gateway material`}
              className="icon-30"
            />
          )}

          <Link to={`/resources/${resources.gateway.slug}`} className="text-decoration-none">
            <span className="text-capitalize">{resources.gateway.name}</span>
          </Link>
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
