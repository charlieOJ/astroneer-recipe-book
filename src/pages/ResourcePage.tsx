import { useParams } from "react-router-dom";

import { OBTAIN_BY } from "../util/constants";
import { ResourceType } from "../types/resourceType";

import RecipeTree from "../components/recipeTree/RecipeTree";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetsList from "../components/PlanetsList";
import Loading from "../components/shared/Loading";
import { useDataContext } from "../context/DataContext";

const ResourcePage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const { resources, loading } = useDataContext();

  if (!id) return <></>;
  if (loading)
    return (
      <div className="container">
        <Loading text="Loading resource info..." />
      </div>
    );

  const resource: ResourceType = resources[parseInt(id)];

  return (
    <div className="container">
      <DetailHeader element={resource} />
      <DetailContent element={resource}>
        <p>
          Obtain by :{" "}
          <span className="text-capitalize">{OBTAIN_BY[resource?.obtainBy || 0].from}</span>
        </p>

        <PlanetsList resource={resource} />
      </DetailContent>

      {resource.recipe && <RecipeTree element={resource} resources={resources} />}
    </div>
  );
};

export default ResourcePage;
