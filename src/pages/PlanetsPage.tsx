import { PlanetType } from "../types/planetType";
import { useDataContext } from "../context/DataContext";

import SearchableList from "../components/searchableList/SearchableList";
import Loading from "../components/shared/Loading";
import ErrorBlock from "../components/ErrorBlock";

const PlanetsPage = () => {
  const { planets, loading, error } = useDataContext();

  if (loading) return <Loading text="Loading planets..." needContainer={true} />;

  return (
    <div className="container">
      <h1>Planets</h1>

      {error ? (
        <ErrorBlock title="Something went wrong" message={error} />
      ) : (
        <SearchableList
          elements={planets}
          elementKeyFn={(planet: PlanetType) => planet.id}
          elementPath="planets"
        />
      )}
    </div>
  );
};

export default PlanetsPage;
