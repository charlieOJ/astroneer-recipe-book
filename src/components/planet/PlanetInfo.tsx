import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PlanetType } from "../../types/planetType";

import { useDataContext } from "../../context/DataContext";
import { imageUrl, resourcesData } from "../../util/utils";

import PlanetDetail from "./PlanetDetail";
import PlanetResources from "./PlanetResources";
import PlanetPower from "./PlanetPower";
import PlanetGateway from "./PlanetGateway";
import PlanetInfoTitle from "./PlanetInfoTitle";
import PlanetFlora from "./PlanetFlora";

const PlanetInfo = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const { t } = useTranslation();
  const { planets, resources } = useDataContext();

  if (!id) return <></>;

  const planet: PlanetType = planets[parseInt(id)];
  if (Object.keys(planet?.resources).length === 0) return <></>;

  const gasIds = planet.resources?.gases?.map(gas => gas.id) || [];
  const planetResources = resourcesData(planet, resources, gasIds);
  const gatewayIcon = imageUrl(planet, "gateway");

  return (
    <table className="table table-borderless planet">
      <tbody>
        <PlanetInfo.Title>{t("planet_page.detail_title")}</PlanetInfo.Title>
        <PlanetDetail planet={planet} />

        <PlanetInfo.Title>{t("planet_page.power_title")}</PlanetInfo.Title>
        <PlanetPower planet={planet} />

        <PlanetInfo.Title>{t("planet_page.resources_title")}</PlanetInfo.Title>
        <PlanetResources planet={planet} resources={planetResources} />

        <PlanetInfo.Title>
          {gatewayIcon && (
            <img src={gatewayIcon} alt={`${planet.name} gateway symbol`} className="me-2 icon-30" />
          )}
          {t("planet_page.gateway_title")}
        </PlanetInfo.Title>
        <PlanetGateway planet={planet} resources={planetResources} />

        <PlanetInfo.Title>{t("planet_page.flora_title")}</PlanetInfo.Title>
        <PlanetFlora planet={planet} />
      </tbody>
    </table>
  );
};

export default PlanetInfo;

PlanetInfo.Title = PlanetInfoTitle;
