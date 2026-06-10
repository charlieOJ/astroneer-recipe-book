import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PlanetType } from "../types/planetType";

import { useDataContext } from "../context/DataContext";

import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetInfo from "../components/planet/PlanetInfo";
import Loading from "../components/shared/Loading";
import ErrorBlock from "../components/ErrorBlock";

const PlanetPage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const { t } = useTranslation();
  const { planets, loading, error } = useDataContext();

  if (!id) return <></>;
  if (loading) return <Loading text={t("loading.planet.msg_one")} needContainer={true} />;
  if (error || !planets[parseInt(id)])
    return (
      <ErrorBlock
        title="Something went wrong"
        message={error || "No planet for this id."}
        needContainer={true}
      />
    );

  const planet: PlanetType = planets[parseInt(id)];

  return (
    <div className="container">
      <DetailHeader element={planet} />

      <DetailContent element={planet}>
        <PlanetInfo />
      </DetailContent>
    </div>
  );
};

export default PlanetPage;
