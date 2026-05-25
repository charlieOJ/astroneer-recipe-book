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

const PlanetResources = ({ planet, resources }: Props) => {
  const renderPrimaryResource = () => {
    if (!resources.primary) return;

    return (
      <tr>
        <td>
          <b>Caves</b>
        </td>

        <td>
          <img
            src={RESOURCES_BASE_URL + resources.primary.icon}
            alt={`${resources.primary.name} primary resource`}
            style={{ width: "40px", height: "40px" }}
          />

          {toCapitalizeCase(resources.primary.name)}
        </td>
      </tr>
    );
  };

  const renderSecondaryResource = () => {
    if (!resources.secondary) return;

    return (
      <tr>
        <td>
          <b>Mantle/Mountains</b>
        </td>

        <td>
          <img
            src={RESOURCES_BASE_URL + resources.secondary.icon}
            alt={`${resources.secondary.name} secondary resource`}
            style={{ width: "40px", height: "40px" }}
          />

          {toCapitalizeCase(resources.secondary.name)}
        </td>
      </tr>
    );
  };

  const renderGasesResource = () => {
    if (!resources.gases) return;
    if (!planet?.resources?.gases) return;

    return (
      <>
        <tr>
          <td rowSpan={resources.gases.length + 1 || 1}>
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
            style={{ width: "40px", height: "40px" }}
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
