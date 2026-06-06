import { useNavigate, useParams } from "react-router-dom";

import { HazardType } from "../types/hazardType";
import { useDataContext } from "../context/DataContext";
import { imageUrl } from "../util/utils";

import Loading from "../components/shared/Loading";

const HazardPage = (): React.JSX.Element => {
  const { id } = useParams<any>();
  const navigate = useNavigate();
  const { hazards, loading } = useDataContext();

  if (!id) return <></>;
  if (loading)
    return (
      <div className="container">
        <Loading text="Loading hazard info..." />
      </div>
    );

  const hazard: HazardType = hazards[parseInt(id)];
  const description = hazard.description.replace(/\n/g, "<br />");
  const image = imageUrl(hazard);
  const seedImage = imageUrl(hazard, "seed");

  return (
    <div className="container">
      <div className="align-items-center d-flex">
        <button className="btn" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-angle-left mb-2"></i>
        </button>

        <h2 className="d-flex gap-3 align-items-center">{hazard.name.toUpperCase()}</h2>
      </div>

      <div className="row mb-3">
        {image && (
          <div className="border-0 col-xs-12 col-md-3">
            <img src={image} className="w-100" alt={hazard.name} />
          </div>
        )}

        <div className={`col-xs-12 ${image && "col-md-9"}`}>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>

      {seedImage && (
        <div className="row my-3">
          <h4 className="col-xs-12">Seed</h4>
          <div className="border-0 col-xs-12 col-md-3">
            <img src={seedImage} className="w-75" alt={`${hazard.name} seed`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HazardPage;
