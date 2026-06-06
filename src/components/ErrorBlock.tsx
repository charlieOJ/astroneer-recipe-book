import { useNavigate } from "react-router-dom";

interface Error {
  title: string;
  message: string;
  needContainer?: boolean;
}

const ErrorBlock = ({ title, message, needContainer = false }: Error): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={`${needContainer && "container"}`}>
      <div className="p-5 bg-danger-subtle rounded-3">
        <div className="container-fluid">
          <h1 className="display-5 fw-bold">{title}</h1>

          <p className="col-md-8 fs-4">{message}</p>

          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-angle-left"></i> Previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBlock;
