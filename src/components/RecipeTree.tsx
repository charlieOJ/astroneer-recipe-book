import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import { recipeTreeData } from "../util/utils";
import { OBTAIN_BY, RESOURCES_BASE_URL } from "../util/constants";
import { ResourceType } from "../types/resourceType";
import { ItemType } from "../types/itemType";
import { RecipeSubResourceType, RecipeTreeType } from "../types/recipeType";

interface Props {
  element: ResourceType | ItemType;
  resources: ResourceType[];
}

const RecipeTree = ({ element, resources }: Props): React.JSX.Element => {
  const itemRecipeData = recipeTreeData(resources, element) as RecipeTreeType;

  const recipeTree = (recipe: RecipeTreeType | RecipeSubResourceType): React.JSX.Element => {
    if (!recipe?.recipeResource) return <></>;

    return (
      <ul className="d-flex flex-column gap-3">
        {Object.keys(recipe?.recipeResource).map((resourceId: string): React.ReactNode => {
          const resourceData = recipe?.recipeResource && recipe?.recipeResource[resourceId];
          const resource = resourceData?.resource;
          let obtainBy = null;
          let obtainByUrl = null;
          if (resource?.obtainBy) {
            obtainBy = " - obtain by ";
            obtainByUrl = OBTAIN_BY[resource?.obtainBy].slug;
          }

          return (
            <li
              key={resourceId}
              className="list-group-item border-start border-2 border-secondary-subtle ps-1"
            >
              <div className="d-flex align-items-center">
                <img
                  src={RESOURCES_BASE_URL + resource?.image}
                  className="icon-50"
                  alt={resource?.name}
                />
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
              {resourceData && recipeTree(resourceData)}
            </li>
          );
        })}
      </ul>
    );
  };

  if (!itemRecipeData.recipeResource) return <></>;

  return (
    <div className="row">
      <div className="col-xs-12 mb-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Show full recipe tree</Accordion.Header>
            <Accordion.Body>
              <h3 className="text-capitalize">{itemRecipeData.name}</h3>

              <p>Create from : </p>
              {recipeTree(itemRecipeData)}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default RecipeTree;
