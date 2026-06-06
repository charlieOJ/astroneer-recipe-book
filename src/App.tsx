import { createBrowserRouter, RouterProvider } from "react-router";

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

import DataProvider from "./context/DataContext";
// import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootPage />,
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
              element: <ItemsPage />,
            },
            {
              path: ":id",
              element: <ItemPage />,
            },
          ],
        },
        {
          path: "/resources",
          children: [
            {
              index: true,
              element: <ResourcesPage />,
            },
            {
              path: ":id",
              element: <ResourcePage />,
            },
          ],
        },
        {
          path: "/planets",
          children: [
            {
              index: true,
              element: <PlanetsPage />,
            },
            {
              path: ":id",
              element: <PlanetPage />,
            },
          ],
        },
        {
          path: "/hazards",
          children: [
            {
              index: true,
              element: <HazardsPage />,
            },
            {
              path: ":id",
              element: <HazardPage />,
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
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
};

export default App;
