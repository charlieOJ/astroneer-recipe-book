import { Link } from "react-router-dom";
import { OBTAIN_BY, RESOURCES_BASE_URL } from "../../util/constants";
import { useState } from "react";

const RecipeBranch = ({ recipe, id }: any) => {
  const [branchStatus, setBranchStatus] = useState<any>(false);

  if (!recipe.recipeResource?.[id]) return null;

  const classes = branchStatus
    ? "bg-success-subtle border-success-subtle"
    : "bg-danger-subtle border-danger-subtle";

  const onCheckResource = (e: any) => {
    setBranchStatus(e.target.checked);
  };

  const resourceData = recipe.recipeResource[id];
  const resource = resourceData.resource;
  let obtainBy = null;
  let obtainByUrl = null;

  if (resource?.obtainBy) {
    obtainBy = " - obtain by ";
    obtainByUrl = OBTAIN_BY[resource?.obtainBy].slug;
  }

  return (
    <li className={`list-group-item border rounded p-1 ${classes}`}>
      <div className="d-flex align-items-center">
        <div className="mx-2 form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={branchStatus}
            onChange={onCheckResource}
            aria-label={`${resource.name}`}
          />
        </div>

        <img src={RESOURCES_BASE_URL + resource?.image} className="icon-50" alt={resource?.name} />

        <p className="m-0">
          <Link to={`/resources/${resource?.slug}`} className="text-decoration-none">
            <strong className="text-capitalize">{resource!.name}</strong>
          </Link>{" "}
          x{resourceData?.quantity ?? 1}
          {obtainBy && (
            <>
              {obtainBy}
              {obtainByUrl ? (
                <Link to={`/items/${obtainByUrl}`} className="text-decoration-none">
                  <strong>{OBTAIN_BY[resource?.obtainBy ?? 0].from}</strong>
                </Link>
              ) : (
                <strong>{OBTAIN_BY[resource?.obtainBy ?? 0].from}</strong>
              )}
            </>
          )}
        </p>
      </div>
      {resourceData.recipeResource && (
        <ul className={`d-flex flex-column gap-1 ${branchStatus ? "d-none" : ""}`}>
          {Object.keys(resourceData.recipeResource).map((resourceId: string): React.JSX.Element => {
            return <RecipeBranch key={resourceId} recipe={resourceData} id={resourceId} />;
          })}
        </ul>
      )}
    </li>
  );
};

export default RecipeBranch;
