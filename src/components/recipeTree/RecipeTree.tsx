import Accordion from "react-bootstrap/Accordion";

import { recipeTreeData } from "../../util/utils";
import { ResourceType } from "../../types/resourceType";
import { ItemType } from "../../types/itemType";
import { RecipeSubResourceType, RecipeTreeType } from "../../types/recipeType";
import RecipeBranch from "./RecipeBranch";

interface Props {
  element: ResourceType | ItemType;
  resources: ResourceType[];
}

const RecipeTree = ({ element, resources }: Props): React.JSX.Element => {
  const itemRecipeData = recipeTreeData(resources, element) as RecipeTreeType;

  const recipeTree = (recipe: RecipeTreeType | RecipeSubResourceType): React.JSX.Element => {
    if (!recipe.recipeResource) return <></>;

    return (
      <ul className="d-flex flex-column gap-1">
        {Object.keys(recipe.recipeResource).map(
          (resourceId: string): React.JSX.Element => (
            <RecipeBranch key={resourceId} recipe={recipe} id={resourceId} />
          ),
        )}
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
