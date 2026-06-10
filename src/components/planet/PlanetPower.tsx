import { useTranslation } from "react-i18next";

import { PlanetType } from "../../types/planetType";
import { nameNoSpace } from "../../util/utils";

interface Props {
  planet: PlanetType;
}

const PlanetPower = ({ planet }: Props): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <tr>
        <td className="row-title">
          <b>{t("planet_page.power.sun")}</b>
        </td>

        <td>{t(`planet_page.difficulty_levels.${nameNoSpace(planet.sun)}`)}</td>
      </tr>

      <tr>
        <td>
          <b>{t("planet_page.power.wind")}</b>
        </td>

        <td>{t(`planet_page.difficulty_levels.${nameNoSpace(planet.wind)}`)}</td>
      </tr>
    </>
  );
};

export default PlanetPower;
