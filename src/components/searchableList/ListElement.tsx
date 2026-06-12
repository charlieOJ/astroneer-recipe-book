import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

import { HazardType } from "../../types/hazardType";
import { ItemType } from "../../types/itemType";
import { PlanetType } from "../../types/planetType";
import { ResourceType } from "../../types/resourceType";

import { I18n, imageUrl } from "../../util/utils";

interface Props {
  element: ItemType | ResourceType | PlanetType | HazardType;
  path: string;
}

const ListElement = ({ element, path }: Props): React.JSX.Element => {
  const { lng } = useParams();
  const { t } = useTranslation();

  const image = imageUrl(element);
  let elemName;
  if (element.kind === "hazard") {
    elemName = I18n(`${element.kind}.${element.name}.name`, element.name);
  } else {
    elemName = I18n(`${element.kind}.${element.name}`, element.name);
  }

  const renderBadges = () => {
    const badges = [] as any;

    switch (element.kind) {
      case "item":
        element.tier.forEach((tr: number, index: number) => {
          badges[index] = {
            class: "secondary",
            text: t(`printers.${tr}`),
          };
        });
        break;
      case "resource":
        badges[0] = { class: "info", text: I18n(`resource_type.${element.type}`, element.type) };
        break;
      case "hazard":
        if (element.type === "aggressive") {
          badges[0] = { class: "danger" };
        } else if (element.type === "defensive") {
          badges[0] = { class: "success" };
        } else {
          badges[0] = { class: "secondary" };
        }

        badges[0] = {
          ...badges[0],
          text: I18n(`searchable_list.filters.hazards_type.${element.type}`, element.type),
        };
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
    <Link to={`/${lng ? lng + "/" : ""}${path}/${element.slug}`} className="text-decoration-none">
      <div className="card h-100">
        {image && (
          <div className="img-list img-thumbnail m-3 border-0 d-flex align-items-center justify-content-center">
            <motion.img
              src={image}
              className="card-img-top rounded"
              alt={elemName}
              whileHover={{ scale: 1.1 }}
            />
          </div>
        )}

        <div className="card-body d-flex align-items-center justify-content-center flex-column gap-1">
          <p className="card-title fs-6 fw-semibold m-0 text-center">{elemName.toUpperCase()}</p>

          {renderBadges()}
        </div>
      </div>
    </Link>
  );
};

export default ListElement;
