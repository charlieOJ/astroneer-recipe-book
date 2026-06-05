import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { ResourceType } from "../types/resourceType";
import { imageUrl } from "../util/utils";

interface Props {
  resource: ResourceType;
}

const Resource = ({ resource }: Props): React.JSX.Element => {
  const image = imageUrl(resource);

  return (
    <Link to={`/resources/${resource.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {image && (
          <div className="img-thumbnail p-3 border-0">
            <motion.img
              src={image}
              className="card-img-top rounded"
              alt={resource.name}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-center justify-content-center">
          <h5 className="card-title">{resource.name.toUpperCase()}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Resource;
