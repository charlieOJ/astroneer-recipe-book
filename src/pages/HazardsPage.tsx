import { HazardType } from "../types/hazardType";
import { useDataContext } from "../context/DataContext";

import Loading from "../components/shared/Loading";
import SearchableList from "../components/searchableList/SearchableList";
import ErrorBlock from "../components/ErrorBlock";

const HazardsPage = (): React.JSX.Element => {
  const { hazards, loading, error } = useDataContext();

  if (loading) return <Loading text="Loading hazards..." needContainer={true} />;

  return (
    <div className="container">
      <h2>Hazards</h2>

      {error ? (
        <ErrorBlock title="Something went wrong" message={error} />
      ) : (
        <SearchableList
          elements={hazards}
          searchParams={["search", "hazardTypes"]}
          elementKeyFn={(hazard: HazardType) => hazard.id}
          elementPath="hazards"
        />
      )}
    </div>
  );
};

export default HazardsPage;
