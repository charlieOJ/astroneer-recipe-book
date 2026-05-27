import { createBrowserRouter, RouterProvider } from "react-router";

import {
  itemsLoader,
  itemLoaders,
  resourcesLoader,
  resourceLoaders,
  planetsLoader,
  planetLoaders,
} from "./util/loaders";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";

import ItemsPage from "./pages/ItemsPage";
import ItemPage from "./pages/ItemPage";

import ResourcesPage from "./pages/ResourcesPage";
import ResourcePage from "./pages/ResourcePage";

import PlanetsPage from "./pages/PlanetsPage";
import PlanetPage from "./pages/PlanetPage";

import ErrorBlock from "./components/ErrorBlock";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorBlock />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "items",
        element: <ItemsPage />,
        loader: itemsLoader,
      },
      {
        path: "items/:id",
        id: "item",
        element: <ItemPage />,
        loader: itemLoaders,
      },
      {
        path: "resources",
        element: <ResourcesPage />,
        loader: () => resourcesLoader(),
      },
      {
        path: "resources/:id",
        element: <ResourcePage />,
        id: "resource",
        loader: resourceLoaders,
      },
      {
        path: "planets",
        element: <PlanetsPage />,
        loader: () => planetsLoader(),
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
