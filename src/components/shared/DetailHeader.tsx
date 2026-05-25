import { useNavigate } from "react-router-dom";
import { ItemType } from "../../types/itemType";
import { ResourceType } from "../../types/resourceType";
import { PlanetType } from "../../types/planetType";
import { RESOURCES_BASE_URL } from "../../util/constants";

interface Props {
  element: ItemType | ResourceType | PlanetType;
}

const DetailHeader = ({ element }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="align-items-center d-flex">
      <button className="btn" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-angle-left mb-2"></i>
      </button>

      <h2 className="d-flex gap-3 align-items-center">
        {element.icon && (
          <img
            src={RESOURCES_BASE_URL + element.icon}
            style={{ width: "30px", height: "30px" }}
            alt={element.name}
          />
        )}
        {element.name.toUpperCase()}
      </h2>
    </div>
  );
};

export default DetailHeader;
