import { useParams } from "react-router-dom";

import { PlanetType } from "../types/planetType";
import { useDataContext } from "../context/DataContext";

import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetInfo from "../components/planet/PlanetInfo";
import Loading from "../components/shared/Loading";

const PlanetPage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const { planets, loading } = useDataContext();

  if (!id) return <></>;
  if (loading)
    return (
      <div className="container">
        <Loading text="Loading planet info..." />
      </div>
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
