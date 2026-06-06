import { HazardType } from "../types/hazardType";
import { useDataContext } from "../context/DataContext";

import Loading from "../components/shared/Loading";
import SearchableList from "../components/searchableList/SearchableList";

const HazardsPage = (): React.JSX.Element => {
  const { hazards, loading } = useDataContext();

  if (loading)
    return (
      <div className="container">
        <Loading text="Loading hazards..." />
      </div>
    );

  return (
    <div className="container">
      <h2>Hazards</h2>

      <SearchableList
        elements={hazards}
        searchParams={["search", "hazardTypes"]}
        elementKeyFn={(hazard: HazardType) => hazard.id}
        elementPath="hazards"
      />
    </div>
  );
};

export default HazardsPage;
