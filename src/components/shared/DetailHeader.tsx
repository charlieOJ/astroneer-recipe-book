import { useNavigate } from "react-router-dom";
import { ItemType } from "../../types/itemType";
import { ResourceType } from "../../types/resourceType";
import { PlanetType } from "../../types/planetType";
import images from "../../imagesConfig";

interface Props {
  element: ItemType | ResourceType | PlanetType;
}

const DetailHeader = ({ element }: Props): React.JSX.Element => {
  const navigate = useNavigate();
  const imageUrl = images[`${element.name}_icon`];

  return (
    <div className="align-items-center d-flex">
      <button className="btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-angle-left mb-2"></i>
      </button>

      <h2 className="d-flex gap-3 align-items-center">
        {imageUrl && <img src={imageUrl} className="icon-40" alt={element.name + " icon"} />}

        {element.name.toUpperCase()}
      </h2>
    </div>
  );
};

export default DetailHeader;
