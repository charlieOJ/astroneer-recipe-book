import { useParams } from "react-router-dom";

import { PRINTERS } from "../util/constants";
import { ItemType } from "../types/itemType";

import RecipeTree from "../components/recipeTree/RecipeTree";
import { ResourceType } from "../types/resourceType";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import Loading from "../components/shared/Loading";
import { useDataContext } from "../context/DataContext";
import ErrorBlock from "../components/ErrorBlock";

const ItemPage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const {
    items,
    resources,
    loading,
    error,
  }: { items: ItemType[]; resources: ResourceType[]; loading: boolean; error: string | null } =
    useDataContext();

  if (!id) return <></>;
  if (loading) return <Loading text="Loading item info..." needContainer={true} />;
  if (error)
    return <ErrorBlock title="Something went wrong" message={error} needContainer={true} />;

  const item: ItemType = items[parseInt(id)];

  return (
    <div className="container">
      <DetailHeader element={item} />

      <DetailContent element={item}>
        <p>
          Craft on :
          <span className="text-capitalize ms-2">
            {item.tier.map((tier: number): string => PRINTERS[tier]).join(" / ")}
          </span>
        </p>
        {item.cost && (
          <p>Unlock cost :{item.cost === "unlock" ? " unlock" : ` ${item.cost} Bytes`}</p>
        )}
      </DetailContent>

      {item.recipe && <RecipeTree element={item} resources={resources} />}
    </div>
  );
};

export default ItemPage;
