import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";

import { I18n, imageUrl } from "../../util/utils";

interface Props {
  planet: PlanetType;
  resources: {
    gateway?: ResourceType;
  };
}

const PlanetGateway = ({ planet, resources }: Props): React.JSX.Element => {
  const { t } = useTranslation();
  const { lng } = useParams();

  const renderGatewayResource = (): React.JSX.Element => {
    if (!resources.gateway) return <></>;

    const icon = imageUrl(resources.gateway);
    const elemName = I18n(`resource.${resources.gateway.name}`, resources.gateway.name);

    return (
      <tr>
        <td>
          <b>{t("planet_page.gateway.material_title")}</b>
        </td>

        <td>
          {icon && <img src={icon} alt={`${elemName} gateway material`} className="icon-30 me-2" />}

          <Link
            to={`/${lng ? lng + "/" : ""}resources/${resources.gateway.slug}`}
            className="text-decoration-none"
          >
            <span className="text-capitalize">{elemName}</span>
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <>
      <tr>
        <td className="row-title">
          <b>{t("planet_page.gateway.power_title")}</b>
        </td>

        <td>{planet.gateway.chamberPower} U/s</td>
      </tr>

      {renderGatewayResource()}
    </>
  );
};

export default PlanetGateway;
