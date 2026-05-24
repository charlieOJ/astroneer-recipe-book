import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import RootPage from "./pages/RootPage";
import HomePage, { itemsLoader } from "./pages/HomePage";
import ItemPage, { itemLoaders } from "./pages/ItemPage";
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
