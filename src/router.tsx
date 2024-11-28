import { createBrowserRouter } from "react-router-dom";

import {
  Error,
  Employee,
  Projects,
  Settings,
  Dashboard,
  Messages,
  Tasks,
  Home,
  Contact,
  About,
  Intranet,
  Privacy,
  Mentions,
} from "./pages";

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
        path: "intranet",
        element: <Intranet />,
        children: [
          {
            path: "projects",
            element: <Projects />,
          },
          {
            path: "employees",
            element: <Employee />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          { path: "messages", element: <Messages /> },
          { path: "tasks", element: <Tasks /> },
        ],
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
