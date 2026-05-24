import { Suspense } from "react";
import { Await, useNavigate, useRouteLoaderData } from "react-router-dom";

import { OBTAIN_BY, RESOURCES_BASE_URL } from "../util/constants";
import { fetchResource, fetchResources } from "../util/http";

import RecipeTree from "../components/RecipeTree";
import { ResourceType } from "../types/resourceType";
import { toCapitalizeCase } from "../util/utils";

const ResourcePage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { resource, resources } = useRouteLoaderData("resource");

  return (
    <Suspense fallback={<p>Loading resource data...</p>}>
      <Await resolve={resource}>
        {(loadedData: { resource: ResourceType }) => {
          const loadedResource = loadedData.resource;

          return (
            <>
              <div className="align-items-center d-flex">
                <button className="btn" onClick={() => navigate(-1)}>
                  <i className="fa-solid fa-angle-left mb-2"></i>
                </button>
                <h2 className="d-flex gap-3 align-items-center">
                  {loadedResource.icon && (
                    <img
                      src={RESOURCES_BASE_URL + loadedResource.icon}
                      style={{ width: "30px", height: "30px" }}
                      alt={loadedResource.name}
                    />
                  )}
                  {loadedResource.name.toUpperCase()}
                </h2>
              </div>

              <div className="row">
                {loadedResource.image && (
                  <div className="img-thumbnail p-3 border-0 col-xs-12 col-md-4">
                    <img
                      src={RESOURCES_BASE_URL + loadedResource.image}
                      className="w-100"
                      alt={loadedResource.name}
                    />
                  </div>
                )}

                <div className="col-xs-12 col-md-8">
                  <p>
                    Obtain by : {toCapitalizeCase(OBTAIN_BY[loadedResource?.obtainBy || 0].from)}
                  </p>
                </div>
              </div>

              <Suspense fallback={<p>Loading resources...</p>}>
                <Await resolve={resources}>
                  {(loadedData: { resources: ResourceType[] }) => {
                    return <RecipeTree element={loadedResource} resources={loadedData.resources} />;
                  }}
                </Await>
              </Suspense>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default ResourcePage;

const resourceLoader = async (id: string) => {
  return await fetchResource(id);
};

const resourcesLoader = async () => {
  return await fetchResources();
};

export const resourceLoaders = async ({ params }: { params: any }) => {
  return {
    resource: await resourceLoader(params.id),
    resources: resourcesLoader(),
  };
};
