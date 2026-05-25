interface Props {
  children: React.ReactNode;
}

const PlanetInfoTitle = ({ children }: Props): React.JSX.Element => {
  return (
    <tr>
      <td colSpan={2} className="text-center bg-secondary-subtle rounded">
        <b>{children}</b>
      </td>
    </tr>
  );
};

export default PlanetInfoTitle;
