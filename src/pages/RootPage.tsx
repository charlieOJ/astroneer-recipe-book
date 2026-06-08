import { Outlet } from "react-router-dom";

import { useLanguageFromUrl } from "../hooks/useLanguageFromUrl";

import Header from "../components/Header";

const RootPage = (): React.JSX.Element => {
  useLanguageFromUrl();

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
