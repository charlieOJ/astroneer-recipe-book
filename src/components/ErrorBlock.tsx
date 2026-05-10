import { JSX } from "react";

interface ErrorProps {
  title: string;
  message: string;

  onConfirm?: () => {};
}

const ErrorBlock = ({ title, message, onConfirm }: ErrorProps): JSX.Element => {
  return (
    <div className="error">
      <h2>{title}</h2>

      <p>{message}</p>

      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorBlock;
