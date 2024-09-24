import { createBrowserRouter } from "react-router-dom";
import { Error } from "./pages";
import { Home } from "./pages";
import { Contact } from "./pages";

import { About } from "./pages";
import { Privacy } from "./pages";
import { Mentions } from "./pages";

import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy-policy",
        element: <Privacy />,
      },
      {
        path: "legal-notice",
        element: <Mentions />,
      },
    ],
  },
]);
