import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { GasType, PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";

import { I18n, imageUrl } from "../../util/utils";

interface Props {
  planet: PlanetType;
  resources: {
    primary?: ResourceType;
    secondary?: ResourceType;
    gases?: ResourceType[];
  };
}

const PlanetResources = ({ planet, resources }: Props): React.JSX.Element => {
  const { t } = useTranslation();
  const { lng } = useParams();

  const renderPrimaryResource = (): React.JSX.Element => {
    if (!resources.primary) return <></>;

    const icon = imageUrl(resources.primary, "icon");
    const elemName = I18n(`resource.${resources.primary.name}`, resources.primary.name);

    return (
      <tr>
        <td className="row-title">
          <b>{t("planets_list.caves")}</b>
        </td>

        <td>
          {icon && <img src={icon} alt={`${elemName} primary resource`} className="icon-30" />}

          <Link
            to={`/${lng ? lng + "/" : ""}resources/${resources.primary.slug}`}
            className="text-decoration-none"
          >
            <span className="text-capitalize">{elemName}</span>
          </Link>
        </td>
      </tr>
    );
  };

  const renderSecondaryResource = (): React.JSX.Element => {
    if (!resources.secondary) return <></>;

    const icon = imageUrl(resources.secondary, "icon");
    const elemName = I18n(`resource.${resources.secondary.name}`, resources.secondary.name);

    return (
      <tr>
        <td className="row-title">
          <b>{t("planets_list.mountains")}</b>
        </td>

        <td>
          {icon && <img src={icon} alt={`${elemName} secondary resource`} className="icon-30" />}

          <Link
            to={`/${lng ? lng + "/" : ""}resources/${resources.secondary.slug}`}
            className="text-decoration-none"
          >
            <span className="text-capitalize">{elemName}</span>
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
            <b>{t("planet_page.gases")}</b>
          </td>
        </tr>

        {planet.resources.gases.map((gas: GasType) => renderGasResource(gas))}
      </>
    );
  };

  const renderGasResource = (gas: GasType): React.JSX.Element => {
    const currentResource = resources.gases?.find((r: ResourceType) => r.id === gas.id);
    if (!currentResource) return <></>;

    const icon = imageUrl(currentResource, "icon");
    const resourceName = I18n(`resource.${currentResource.name}`, currentResource.name);

    return (
      <tr key={gas.id}>
        <td>
          {icon && <img src={icon} alt={`${resourceName} gas`} className="icon-30" />}
          <Link
            to={`/${lng ? lng + "/" : ""}resources/${currentResource.slug}`}
            className="text-decoration-none me-2"
          >
            <span className="text-capitalize">{resourceName}</span>
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
