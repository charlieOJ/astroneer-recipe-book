import { Link } from "react-router-dom";
import { GasType, PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { RESOURCES_BASE_URL } from "../../util/constants";

interface Props {
  planet: PlanetType;
  resources: {
    primary?: ResourceType;
    secondary?: ResourceType;
    gases?: ResourceType[];
  };
}

const PlanetResources = ({ planet, resources }: Props): React.JSX.Element => {
  const renderPrimaryResource = (): React.JSX.Element => {
    if (!resources.primary) return <></>;

    return (
      <tr>
        <td className="row-title">
          <b>Caves</b>
        </td>

        <td>
          <img
            src={RESOURCES_BASE_URL + resources.primary.icon}
            alt={`${resources.primary.name} primary resource`}
            className="icon-30"
          />

          <Link to={`/resources/${resources.primary.id}`} className="text-decoration-none">
            <span className="text-capitalize">{resources.primary.name}</span>
          </Link>
        </td>
      </tr>
    );
  };

  const renderSecondaryResource = (): React.JSX.Element => {
    if (!resources.secondary) return <></>;

    return (
      <tr>
        <td className="row-title">
          <b>Mantle/Mountains</b>
        </td>

        <td>
          <img
            src={RESOURCES_BASE_URL + resources.secondary.icon}
            alt={`${resources.secondary.name} secondary resource`}
            className="icon-30"
          />

          <Link to={`/resources/${resources.secondary.id}`} className="text-decoration-none">
            <span className="text-capitalize">{resources.secondary.name}</span>
          </Link>
        </td>
      </tr>
    );
  };

  const renderGasesResource = (): React.JSX.Element => {
    if (!resources.gases) return <></>;
    if (!planet?.resources?.gases) return <></>;

    return (
      <>
        <tr>
          <td rowSpan={resources.gases.length + 1 || 1} className="row-title">
            <b>Gases</b>
          </td>
        </tr>

        {planet.resources.gases.map((gas: GasType) => renderGasResource(gas))}
      </>
    );
  };

  const renderGasResource = (gas: GasType): React.JSX.Element => {
    const currentResource = resources.gases?.find((r: ResourceType) => r.id === gas.id);
    if (!currentResource) return <></>;

    return (
      <tr key={gas.id}>
        <td>
          <img
            src={RESOURCES_BASE_URL + currentResource.icon}
            alt={`${currentResource.name} gas`}
            className="icon-30"
          />
          <Link to={`/resources/${currentResource.id}`} className="text-decoration-none me-2">
            <span className="text-capitalize">{currentResource.name}</span>
          </Link>
          ({gas.ppu} ppu)
        </td>
      </tr>
    );
  };

  return (
    <>
      {renderPrimaryResource()}
      {renderSecondaryResource()}
      {renderGasesResource()}
    </>
  );
};

export default PlanetResources;
