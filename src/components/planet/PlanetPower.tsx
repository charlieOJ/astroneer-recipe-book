import { useTranslation } from "react-i18next";

import { PlanetType } from "../../types/planetType";

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

        <td>{t(`planet_page.difficulty_levels.${planet.sun.replaceAll(/-| /g, "_")}`)}</td>
      </tr>

      <tr>
        <td>
          <b>{t("planet_page.power.wind")}</b>
        </td>

        <td>{t(`planet_page.difficulty_levels.${planet.wind.replaceAll(/-| /g, "_")}`)}</td>
      </tr>
    </>
  );
};

export default PlanetPower;
