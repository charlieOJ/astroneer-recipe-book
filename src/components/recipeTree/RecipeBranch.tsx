import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { RecipeSubResourceType, RecipeTreeType } from "../../types/recipeType";
import { OBTAIN_BY } from "../../util/constants";
import { imageUrl } from "../../util/utils";

interface Props {
  recipe: RecipeTreeType | RecipeSubResourceType;
  id: string;
}

const RecipeBranch = ({ recipe, id }: Props): React.JSX.Element => {
  const [branchStatus, setBranchStatus] = useState<any>(false);

  const classes = branchStatus
    ? "bg-success-subtle border-success-subtle"
    : "bg-danger-subtle border-danger-subtle";

  const variants = {
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      display: "block",
    },
    hidden: {
      opacity: 0,
      height: 0,
      y: 10,
      overflow: "hidden",
      display: "none",
    },
  };

  const onCheckResource = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchStatus(e.target.checked);
  };

  if (!recipe.recipeResource?.[id]) return <></>;

  const resourceData = recipe.recipeResource[id];
  const resource = resourceData.resource;
  const image = imageUrl(resource);

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

        {image && <img src={image} className="icon-50" alt={resource?.name} />}

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
        <motion.ul
          initial="hidden"
          animate={branchStatus ? "hidden" : "visible"}
          variants={variants}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="d-flex flex-column gap-1"
        >
          {Object.keys(resourceData.recipeResource).map((resourceId: string): React.JSX.Element => {
            return <RecipeBranch key={resourceId} recipe={resourceData} id={resourceId} />;
          })}
        </motion.ul>
      )}
    </li>
  );
};

export default RecipeBranch;
