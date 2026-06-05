import { Suspense } from "react";
import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";

import images from "../imagesConfig";

import { HazardType } from "../types/hazardType";

import Loading from "../components/shared/Loading";

const HazardPage = (): React.JSX.Element => {
  const { hazard } = useRouteLoaderData("hazard");
  const navigate = useNavigate();

  return (
    <div className="container">
      <Suspense fallback={<Loading text="Loading item data..." />}>
        <Await resolve={hazard}>
          {(loadedData: { hazard: HazardType }) => {
            const loadedHazard = loadedData.hazard;
            const description = loadedHazard.description.replace(/\n/g, "<br/>");
            const imageUrl = images[loadedHazard.name];
            const seedImageUrl = images[`${loadedHazard.name}_seed`];

            return (
              <>
                <div className="align-items-center d-flex">
                  <button className="btn" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-angle-left mb-2"></i>
                  </button>

                  <h2 className="d-flex gap-3 align-items-center">
                    {loadedHazard.name.toUpperCase()}
                  </h2>
                </div>

                <div className="row mb-3">
                  {imageUrl && (
                    <div className="border-0 col-xs-12 col-md-3">
                      <img src={imageUrl} className="w-100" alt={loadedHazard.name} />
                    </div>
                  )}

                  <div className={`col-xs-12 ${imageUrl && "col-md-9"}`}>
                    <div dangerouslySetInnerHTML={{ __html: description }}></div>
                  </div>
                </div>

                {seedImageUrl && (
                  <div className="row my-3">
                    <h4 className="col-xs-12">Seed</h4>
                    <div className="border-0 col-xs-12 col-md-3">
                      <img src={seedImageUrl} className="w-75" alt={`${loadedHazard.name} seed`} />
                    </div>
                  </div>
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default HazardPage;
