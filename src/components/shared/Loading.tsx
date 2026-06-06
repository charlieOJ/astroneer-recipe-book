interface Props {
  text: string;
  isOnTable?: boolean;
  needContainer?: boolean;
}

const Loading = ({ text, isOnTable = false, needContainer = false }: Props) => {
  const renderLoading = (
    <div className={`${needContainer && "container"}`}>
      <div className="d-flex align-items-center">
        <div className="spinner-border" role="status"></div>
        <span className="ms-2">{text}</span>
      </div>
    </div>
  );

  if (isOnTable)
    return (
      <tr>
        <td>{renderLoading}</td>
      </tr>
    );

  return renderLoading;
};

export default Loading;
