import { Link } from "react-router-dom";

import { RESOURCES_BASE_URL } from "../util/constants";
import { ResourceType } from "../types/resourceType";

interface Props {
  resource: ResourceType;
}

const Resource = ({ resource }: Props): React.JSX.Element => {
  return (
    <Link to={`/resources/${resource.id}`} className="text-decoration-none">
      <div className="card h-100">
        {resource.image && (
          <div className="img-thumbnail p-3 border-0">
            <img
              src={RESOURCES_BASE_URL + resource.image}
              className="card-img-top rounded"
              alt={resource.name}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-end justify-content-center">
          <h5 className="card-title">{resource.name.toUpperCase()}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Resource;
