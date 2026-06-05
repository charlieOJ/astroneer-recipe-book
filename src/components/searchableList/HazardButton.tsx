interface Props {
  children: React.ReactNode;
  type: string;
  isChecked: boolean;
  icon: string;
  onChange: (type: string, prevState: boolean) => void;
}

const HazardButton = ({ children, type, isChecked, icon, onChange }: Props) => {
  const displayClasses = isChecked ? "btn-dark text-white" : "btn-light btn-outline-dark";

  return (
    <button className={`btn ${displayClasses} me-2 mb-2`} onClick={() => onChange(type, isChecked)}>
      <i className={`fa-solid fa-${icon}`}></i> {children}
    </button>
  );
};

export default HazardButton;
