import { useNavigate, useRouteError } from "react-router-dom";

interface Error {
  data: string;
  message?: string | any;
  status?: number;
}

const ErrorBlock = (): React.JSX.Element => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  let title = "An error occurred!";
  let message = "Something went wrong!";

  switch (error.status) {
    case 500:
      message = JSON.parse(error.data).message;
      break;
    case 404:
      title = "Not found!";
      message = "Could not find this page.";
      break;
  }

  return (
    <div className="error d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="p-5 bg-danger-subtle rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">{title}</h1>

            <p className="col-md-8 fs-4">{message}</p>

            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-angle-left"></i> Previous page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBlock;
