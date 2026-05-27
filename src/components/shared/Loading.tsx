interface Props {
  text: string;
}

const Loading = ({ text }: Props) => {
  return (
    <div className="d-flex align-items-center">
      <div className="spinner-border" role="status"></div>
      <span className="ms-2">{text}</span>
    </div>
  );
};

export default Loading;
