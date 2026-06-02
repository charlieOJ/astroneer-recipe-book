interface Props {
  children: React.ReactNode;
  id: number;
  isChecked: boolean;
  onChange: (id: number, prevState: boolean) => void;
}

const TierButton = ({ children, id, isChecked, onChange }: Props) => {
  const displayClasses = isChecked ? "btn-dark text-white" : "btn-light btn-outline-dark";

  return (
    <button className={`btn ${displayClasses} me-2 mb-2`} onClick={() => onChange(id, isChecked)}>
      <i className="fa-solid fa-print"></i> {children}
    </button>
  );
};

export default TierButton;
