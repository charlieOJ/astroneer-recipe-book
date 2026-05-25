import { ItemType } from "../../types/itemType";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { RESOURCES_BASE_URL } from "../../util/constants";

interface Props {
  element: ItemType | ResourceType | PlanetType;
  children: React.ReactNode;
}

const DetailContent = ({ element, children }: Props): React.JSX.Element => {
  return (
    <div className="row mb-3">
      {element.image && (
        <div className="border-0 col-xs-12 col-md-3">
          <img src={RESOURCES_BASE_URL + element.image} className="w-100" alt={element.name} />
        </div>
      )}

      <div className="col-xs-12 col-md-9">{children}</div>
    </div>
  );
};

export default DetailContent;
