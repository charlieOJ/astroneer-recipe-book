import { PlanetType } from "../types/planetType";
import { useDataContext } from "../context/DataContext";

import SearchableList from "../components/searchableList/SearchableList";
import Loading from "../components/shared/Loading";

const PlanetsPage = () => {
  const { planets, loading } = useDataContext();

  if (loading)
    return (
      <div className="container">
        <Loading text="Loading resources..." />
      </div>
    );

  return (
    <div className="container">
      <h1>Planets</h1>

      <SearchableList
        elements={planets}
        elementKeyFn={(planet: PlanetType) => planet.id}
        elementPath="planets"
      />
    </div>
  );
};

export default PlanetsPage;
