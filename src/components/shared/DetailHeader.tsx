import { useNavigate } from "react-router-dom";

import { ItemType } from "../../types/itemType";
import { ResourceType } from "../../types/resourceType";
import { PlanetType } from "../../types/planetType";

import { I18n, iconItemUrl, imageUrl } from "../../util/utils";

interface Props {
  element: ItemType | ResourceType | PlanetType;
}

const DetailHeader = ({ element }: Props): React.JSX.Element => {
  const navigate = useNavigate();
  const icon = element.kind === "item" ? iconItemUrl(element) : imageUrl(element, "icon");
  const elemName = I18n(`${element.kind}.${element.name}`, element.name);

  return (
    <div className="align-items-center d-flex">
      <button className="btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-angle-left mb-2"></i>
      </button>

      <h2 className="d-flex gap-3 align-items-center">
        {icon && <img src={icon} className="icon-30" alt={elemName + " icon"} />}

        {elemName.toUpperCase()}
      </h2>
    </div>
  );
};

export default DetailHeader;
