import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { PlanetType } from "../../types/planetType";
import { imageUrl } from "../../util/utils";

interface Props {
  planet: PlanetType;
}

const Planet = ({ planet }: Props): React.JSX.Element => {
  const image = imageUrl(planet);

  return (
    <Link to={`/planets/${planet.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {image && (
          <div className="img-thumbnail p-3 border-0">
            <motion.img
              src={image}
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
