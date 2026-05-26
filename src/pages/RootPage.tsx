import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootPage = (): React.JSX.Element => {
  return (
    <>
      <div className="container">
        <Header />
      </div>

      <Outlet />
    </>
  );
};

export default RootPage;
