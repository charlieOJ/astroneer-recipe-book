import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { ItemType } from "../types/itemType";
import { imageUrl } from "../util/utils";

interface Props {
  item: ItemType;
}

const Item = ({ item }: Props): React.JSX.Element => {
  const image = imageUrl(item);

  return (
    <Link to={`/items/${item.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {image && (
          <div className="img-thumbnail p-3 border-0">
            <motion.img
              src={image}
              className="card-img-top rounded"
              alt={item.name}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-center justify-content-center">
          <h5 className="card-title">{item.name.toUpperCase()}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Item;
