import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

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
import { Suspense } from "react";
// import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter(
  [
    {
      path: "/:lng?",
      element: <RootPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "items",
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
          path: "resources",
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
          path: "planets",
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
          path: "hazards",
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
    // }
  ],
  { basename: "/astroneer-recipe-book" },
);

const App = (): React.JSX.Element => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Chargement des traductions...</div>}>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </Suspense>
    </I18nextProvider>
  );
};

export default App;
