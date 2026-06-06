import { useParams } from "react-router-dom";

import { OBTAIN_BY } from "../util/constants";
import { ResourceType } from "../types/resourceType";

import RecipeTree from "../components/recipeTree/RecipeTree";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetsList from "../components/PlanetsList";
import Loading from "../components/shared/Loading";
import { useDataContext } from "../context/DataContext";
import ErrorBlock from "../components/ErrorBlock";

const ResourcePage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const { resources, loading, error } = useDataContext();

  if (!id) return <></>;
  if (loading) return <Loading text="Loading resource info..." needContainer={true} />;
  if (error)
    return <ErrorBlock title="Something went wrong" message={error} needContainer={true} />;

  const resource: ResourceType = resources[parseInt(id)];

  if (!resource)
    return (
      <ErrorBlock
        title="Something went wrong"
        message="This resource do not exist."
        needContainer={true}
      />
    );

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
