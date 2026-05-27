import { useState } from "react";

interface Props {
  children: React.ReactNode;
  id: number;
  onChange: (id: number, prevState: boolean) => void;
}

const TierButton = ({ children, id, onChange }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const displayClasses = isChecked ? "btn-dark text-white" : "btn-light btn-outline-dark";

  return (
    <button
      className={`btn ${displayClasses} me-3`}
      onClick={() => {
        setIsChecked(prev => !prev);
        onChange(id, isChecked);
      }}
    >
      {children}
    </button>
  );
};

export default TierButton;
