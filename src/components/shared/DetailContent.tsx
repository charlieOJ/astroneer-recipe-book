import { ItemType } from "../../types/itemType";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";

import { I18n, imageUrl } from "../../util/utils";

interface Props {
  element: ItemType | ResourceType | PlanetType;
  children: React.ReactNode;
}

const DetailContent = ({ element, children }: Props): React.JSX.Element => {
  const image = imageUrl(element);
  const elemName = I18n(`${element.kind}.${element.name}`, element.name);

  return (
    <div className="row mb-3">
      {image && (
        <div className="border-0 col-xs-12 col-md-3">
          <img src={image} className="w-100" alt={elemName} />
        </div>
      )}

      <div className="col-xs-12 col-md-9">{children}</div>
    </div>
  );
};

export default DetailContent;
