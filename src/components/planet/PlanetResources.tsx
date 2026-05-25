import { GasType, PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { RESOURCES_BASE_URL } from "../../util/constants";
import { toCapitalizeCase } from "../../util/utils";

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
            className="icon-40"
          />

          {toCapitalizeCase(resources.primary.name)}
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
            className="icon-40"
          />

          {toCapitalizeCase(resources.secondary.name)}
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
            className="icon-40"
          />
          {toCapitalizeCase(currentResource.name)} ({gas.ppu} ppu)
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
