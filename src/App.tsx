import { createBrowserRouter, RouterProvider } from "react-router";

import {
  itemsLoader,
  itemLoaders,
  resourcesLoader,
  resourceLoaders,
  planetsLoader,
  planetLoaders,
  hazardsLoader,
  hazardLoaders,
} from "./util/loaders";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";

import ItemsPage from "./pages/ItemsPage";
import ItemPage from "./pages/ItemPage";

import ResourcesPage from "./pages/ResourcesPage";
import ResourcePage from "./pages/ResourcePage";

import PlanetsPage from "./pages/PlanetsPage";
import PlanetPage from "./pages/PlanetPage";

import HazardsPage from "./pages/HazardsPage";
import HazardPage from "./pages/HazardPage";

import ErrorBlock from "./components/ErrorBlock";
// import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorBlock />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/items",
          children: [
            {
              index: true,
              id: "items",
              element: <ItemsPage />,
              loader: itemsLoader,
            },
            {
              path: ":id",
              id: "item",
              element: <ItemPage />,
              loader: itemLoaders,
            },
          ],
        },
        {
          path: "/resources",
          children: [
            {
              index: true,
              element: <ResourcesPage />,
              loader: () => resourcesLoader(),
            },
            {
              path: ":id",
              element: <ResourcePage />,
              id: "resource",
              loader: resourceLoaders,
            },
          ],
        },
        {
          path: "/planets",
          children: [
            {
              index: true,
              element: <PlanetsPage />,
              loader: () => planetsLoader(),
            },
            {
              path: ":id",
              element: <PlanetPage />,
              id: "planet",
              loader: planetLoaders,
            },
          ],
        },
        {
          path: "/hazards",
          children: [
            {
              index: true,
              element: <HazardsPage />,
              loader: () => hazardsLoader(),
            },
            {
              path: ":id",
              element: <HazardPage />,
              id: "hazard",
              loader: hazardLoaders,
            },
          ],
        },
      ],
    },
    // {
    //   path: "*",
    //   element: <NotFoundPage />,
    // },
  ],
  { basename: "/astroneer-recipe-book" },
);

const App = (): React.JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
