import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { HazardType } from "../types/hazardType";

import images from "../imagesConfig";

interface Props {
  hazard: HazardType;
}

const Hazard = ({ hazard }: Props): React.JSX.Element => {
  const imageUrl = images[hazard.name];

  return (
    <Link to={`/hazards/${hazard.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {imageUrl && (
          <div
            className="img-thumbnail m-3 border-0 d-flex align-items-center justify-content-center"
            style={{ height: "150px" }}
          >
            <motion.img
              src={imageUrl}
              className="card-img-top rounded"
              style={{ maxHeight: "stretch", maxWidth: "fit-content" }}
              alt={hazard.name}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-center justify-content-center">
          <h5 className="card-title">{hazard.name.toUpperCase()}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Hazard;
