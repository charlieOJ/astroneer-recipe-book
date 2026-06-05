import { Link } from "react-router-dom";
import { motion } from "motion/react";

import images from "../imagesConfig";

import { ItemType } from "../types/itemType";

interface Props {
  item: ItemType;
}

const Item = ({ item }: Props): React.JSX.Element => {
  const resourceName = item.name.replaceAll(" ", "_");
  const imageUrl = images[resourceName];

  return (
    <Link to={`/items/${item.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {imageUrl && (
          <div className="img-thumbnail p-3 border-0">
            <motion.img
              src={imageUrl}
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
