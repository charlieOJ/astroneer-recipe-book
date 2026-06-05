import { useNavigate } from "react-router-dom";

import { ItemType } from "../../types/itemType";
import { ResourceType } from "../../types/resourceType";
import { PlanetType } from "../../types/planetType";
import { imageUrl } from "../../util/utils";

interface Props {
  element: ItemType | ResourceType | PlanetType;
}

const DetailHeader = ({ element }: Props): React.JSX.Element => {
  const navigate = useNavigate();
  const icon = imageUrl(element, "icon");

  return (
    <div className="align-items-center d-flex">
      <button className="btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-angle-left mb-2"></i>
      </button>

      <h2 className="d-flex gap-3 align-items-center">
        {icon && <img src={icon} className="icon-40" alt={element.name + " icon"} />}

        {element.name.toUpperCase()}
      </h2>
    </div>
  );
};

export default DetailHeader;
