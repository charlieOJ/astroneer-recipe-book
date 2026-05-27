import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { RESOURCES_BASE_URL } from "../../util/constants";
import { PlanetType } from "../../types/planetType";

interface Props {
  planet: PlanetType;
}

const Planet = ({ planet }: Props): React.JSX.Element => {
  return (
    <Link to={`/planets/${planet.id}`} className="text-decoration-none">
      <div className="card h-100">
        {planet.image && (
          <div className="img-thumbnail p-3 border-0">
            <motion.img
              src={RESOURCES_BASE_URL + planet.image}
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
