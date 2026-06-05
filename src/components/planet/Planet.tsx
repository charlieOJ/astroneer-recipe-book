import { Link } from "react-router-dom";
import { motion } from "motion/react";

import images from "../../imagesConfig";

import { PlanetType } from "../../types/planetType";

interface Props {
  planet: PlanetType;
}

const Planet = ({ planet }: Props): React.JSX.Element => {
  const imageUrl = images[planet.name];

  return (
    <Link to={`/planets/${planet.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {imageUrl && (
          <div className="img-thumbnail p-3 border-0">
            <motion.img
              src={imageUrl}
              className="card-img-top rounded"
              alt={planet.name}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-center justify-content-center">
          <h5 className="card-title">{planet.name.toUpperCase()}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Planet;
