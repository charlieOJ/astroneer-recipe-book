import { useParams } from "react-router-dom";

import { PRINTERS } from "../util/constants";
import { ItemType } from "../types/itemType";

import RecipeTree from "../components/recipeTree/RecipeTree";
import { ResourceType } from "../types/resourceType";
import DetailHeader from "../components/shared/DetailHeader";
import DetailContent from "../components/shared/DetailContent";
import Loading from "../components/shared/Loading";
import { useDataContext } from "../context/DataContext";

const ItemPage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const {
    items,
    resources,
    loading,
  }: { items: ItemType[]; resources: ResourceType[]; loading: boolean } = useDataContext();

  if (!id) return <></>;
  if (loading)
    return (
      <div className="container">
        <Loading text="Loading hazard info..." />
      </div>
    );

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
