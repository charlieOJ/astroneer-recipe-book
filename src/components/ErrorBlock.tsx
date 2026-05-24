import { useRouteError } from "react-router-dom";

interface Error {
  data: { message: string };
  status?: number;
}

const ErrorBlock = (): React.JSX.Element => {
  const error = useRouteError() as Error | any;

  let title = "An error occurred!";
  let message = "Something went wrong!";

  switch (error.status) {
    case 500:
      message = error.data.message;
      break;
    case 404:
      title = "Not found!";
      message = "Could not find resource or page.";
      break;
    default:
      message = error.message;
  }

  return (
    <div className="error">
      <h2>{title}</h2>

      <p>{message}</p>
    </div>
  );
};

export default ErrorBlock;
