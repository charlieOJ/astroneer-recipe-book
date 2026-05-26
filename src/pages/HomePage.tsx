import { Link } from "react-router-dom";

const HomePage = (): React.JSX.Element => {
  return (
    <>
      <main className="main-bg d-flex align-items-center justify-content-around">
        <Link to="resources" className="btn btn-lg btn-light btn-outline-dark">
          Resources
        </Link>
        <Link to="items" className="btn btn-lg btn-light btn-outline-dark">
          Items
        </Link>
        <Link to="planets" className="btn btn-lg btn-light btn-outline-dark">
          Planets
        </Link>
      </main>
    </>
  );
};

export default HomePage;
