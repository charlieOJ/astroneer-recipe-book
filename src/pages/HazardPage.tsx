import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { HazardType } from "../types/hazardType";

import { useDataContext } from "../context/DataContext";
import { I18n, imageUrl } from "../util/utils";

import Loading from "../components/shared/Loading";
import ErrorBlock from "../components/ErrorBlock";

const HazardPage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const navigate = useNavigate();
  const { hazards, loading, error } = useDataContext();
  const { t } = useTranslation();

  if (!id) return <></>;
  if (loading) return <Loading text={t("loading.hazard.msg_one")} needContainer={true} />;
  if (error)
    return <ErrorBlock title="Something went wrong" message={error} needContainer={true} />;

  const hazard: HazardType = hazards[parseInt(id)];
  const description = hazard.description.replace(/\n/g, "<br />");
  const image = imageUrl(hazard);
  const seedImage = imageUrl(hazard, "seed");
  const hazardName = I18n(`hazard.${hazard.name}.name`, hazard.name);
  const hazardDescription = I18n(`hazard.${hazard.name}.description`, description);

  return (
    <div className="container">
      <div className="align-items-center d-flex">
        <button className="btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-angle-left mb-2"></i>
        </button>

        <h2 className="d-flex gap-3 align-items-center">{hazardName.toUpperCase()}</h2>
      </div>

      <div className="row mb-3">
        {image && (
          <div className="border-0 col-xs-12 col-md-3">
            <img src={image} className="w-100" alt={hazardName} />
          </div>
        )}

        <div className={`col-xs-12 ${image && "col-md-9"}`}>
          <div dangerouslySetInnerHTML={{ __html: hazardDescription }}></div>
        </div>
      </div>

      {seedImage && (
        <div className="row my-3">
          <h4 className="col-xs-12">{t("hazard.seed")}</h4>
          <div className="border-0 col-xs-12 col-md-3">
            <img src={seedImage} className="w-75" alt={`${hazardName} seed`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HazardPage;
