import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="p-5 bg-danger-subtle rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">404 - Not Found</h1>

            <p className="col-md-8 fs-4">The page you are looking for does not exist.</p>

            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-angle-left"></i> Previous page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
