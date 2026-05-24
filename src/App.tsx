import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";

import RootPage from "./pages/RootPage";
import HomePage, { itemsLoader } from "./pages/HomePage";
import ItemPage, { itemLoaders } from "./pages/ItemPage";
import ResourcePage, { resourceLoaders } from "./pages/ResourcePage";
import PlanetPage, { planetLoaders } from "./pages/PlanetPage";

import ErrorBlock from "./components/ErrorBlock";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorBlock />,
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: itemsLoader,
      },
      {
        path: "items/:id",
        id: "item",
        element: <ItemPage />,
        loader: itemLoaders,
      },
      {
        path: "resources/:id",
        element: <ResourcePage />,
        id: "resource",
        loader: resourceLoaders,
      },
      {
        path: "planets/:id",
        element: <PlanetPage />,
        id: "planet",
        loader: planetLoaders,
      },
    ],
  },
]);

const App = (): React.JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
