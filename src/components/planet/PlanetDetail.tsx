import { useTranslation } from "react-i18next";

import { PlanetType } from "../../types/planetType";
import { I18n, imageUrl, nameNoSpace } from "../../util/utils";

interface Props {
  planet: PlanetType;
}

const PlanetDetail = ({ planet }: Props): React.JSX.Element => {
  const { t } = useTranslation();
  const icon = imageUrl(planet, "icon");

  return (
    <>
      <tr>
        <td rowSpan={2} className="row-title">
          <b>{t("planet_page.details.type.title")}</b>
        </td>

        <td colSpan={2}>
          {icon && <img src={icon} alt={`${planet.name} icon`} className="me-2 icon-30" />}
          <span className="text-capitalize">
            {I18n(`planet_page.details.type.${planet.type}.text`, planet.type)}
          </span>
        </td>
      </tr>

      <tr>
        <td colSpan={2}>
          {I18n(`planet_page.details.type.${planet.type}.description`, planet.typeDescription)}
        </td>
      </tr>

      <tr>
        <td className="row-title">
          <b>{t("planet_page.details.day_night_cycle")}</b>
        </td>
        <td>~ {planet.dayNightCycle}</td>
      </tr>

      <tr>
        <td className="row-title">
          <b>{t("planet_page.details.difficulty")}</b>
        </td>
        <td>
          {I18n(
            `planet_page.difficulty_levels.${nameNoSpace(planet.difficulty)}`,
            planet.difficulty,
          )}
        </td>
      </tr>
    </>
  );
};

export default PlanetDetail;
