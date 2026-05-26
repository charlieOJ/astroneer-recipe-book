import { Link } from "react-router-dom";

import { ItemType } from "../types/itemType";
import { RESOURCES_BASE_URL } from "../util/constants";

interface Props {
  item: ItemType;
}

const Item = ({ item }: Props): React.JSX.Element => {
  return (
    <Link to={`/items/${item.id}`} className="text-decoration-none">
      <div className="card h-100">
        {item.image && (
          <div className="img-thumbnail p-3 border-0">
            <img
              src={RESOURCES_BASE_URL + item.image}
              className="card-img-top rounded"
              alt={item.name}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-end justify-content-center">
          <h5 className="card-title">{item.name.toUpperCase()}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Item;
