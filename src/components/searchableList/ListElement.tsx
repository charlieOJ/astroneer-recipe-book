import { Link } from "react-router-dom";
import { motion } from "motion/react";

import { HazardType } from "../../types/hazardType";
import { ItemType } from "../../types/itemType";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";
import { imageUrl } from "../../util/utils";
import { PRINTERS } from "../../util/constants";

interface Props {
  element: ItemType | ResourceType | PlanetType | HazardType;
  path: string;
}

const ListElement = ({ element, path }: Props): React.JSX.Element => {
  const image = imageUrl(element);

  const renderBadges = () => {
    const badges = [] as any;

    switch (element.kind) {
      case "item":
        element.tier.map(
          (t: number, index: number) => (badges[index] = { class: "secondary", text: PRINTERS[t] }),
        );
        break;
      case "resource":
        badges[0] = { class: "info", text: element.type };
        break;
      case "hazard":
        switch (element.type) {
          case "aggressive":
            badges[0] = { class: "danger" };
            break;
          case "defensive":
            badges[0] = { class: "success" };
            break;

          default:
            badges[0] = { class: "secondary" };

            break;
        }
        badges[0] = { ...badges[0], text: element.type };
        break;
    }

    if (badges.length === 0) return <></>;

    return badges.map((badge: { text: string; class: string }, index: number) => {
      return (
        <span key={index} className={`badge text-bg-${badge.class} text-capitalize`}>
          {badge.text}
        </span>
      );
    });
  };

  return (
    <Link to={`/${path}/${element.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {image && (
          <div className="img-list img-thumbnail m-3 border-0 d-flex align-items-center justify-content-center">
            <motion.img
              src={image}
              className="card-img-top rounded"
              alt={element.name}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-center justify-content-center flex-column gap-1">
          <p className="card-title fs-6 fw-semibold m-0 text-center">
            {element.name.toUpperCase()}
          </p>

          {renderBadges()}
        </div>
      </div>
    </Link>
  );
};

export default ListElement;
