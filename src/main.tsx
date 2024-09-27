import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
//import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/utils/ThemeProvider";

import { router } from "./router.jsx";

import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No root element found");
}
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
