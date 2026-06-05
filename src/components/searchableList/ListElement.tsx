import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { HazardType } from "../../types/hazardType";
import { ItemType } from "../../types/itemType";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { imageUrl } from "../../util/utils";

interface Props {
  element: ItemType | ResourceType | PlanetType | HazardType;
  path: string;
}

const ListElement = ({ element, path }: Props): React.JSX.Element => {
  const image = imageUrl(element);

  return (
    <Link to={`/${path}/${element.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {image && (
          <div className="img-list img-thumbnail m-3 border-0 d-flex align-items-center justify-content-center">
            <motion.img
              src={image}
              className="card-img-top rounded"
              alt={element.name}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-center justify-content-center">
          <p className="card-title fs-6 fw-semibold m-0 text-center">
            {element.name.toUpperCase()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListElement;
