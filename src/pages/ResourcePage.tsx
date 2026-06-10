import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ResourceType } from "../types/resourceType";

import { useDataContext } from "../context/DataContext";

import RecipeTree from "../components/recipeTree/RecipeTree";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import PlanetsList from "../components/PlanetsList";
import Loading from "../components/shared/Loading";
import ErrorBlock from "../components/ErrorBlock";

const ResourcePage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const { resources, loading, error } = useDataContext();
  const { t } = useTranslation();

  if (!id) return <></>;
  if (loading) return <Loading text={t("loading.resource.msg_one")} needContainer={true} />;
  if (error || !resources[parseInt(id)])
    return (
      <ErrorBlock
        title="Something went wrong"
        message={error || "This resource do not exist."}
        needContainer={true}
      />
    );

  const resource: ResourceType = resources[parseInt(id)];

  return (
    <div className="container">
      <DetailHeader element={resource} />
      <DetailContent element={resource}>
        <p>
          {t("obtain_by.text")} :{" "}
          <span className="text-capitalize">{t(`obtain_by.${resource?.obtainBy}`)}</span>
        </p>

        <PlanetsList resource={resource} />
      </DetailContent>

      {resource.recipe && <RecipeTree element={resource} resources={resources} />}
    </div>
  );
};

export default ResourcePage;
