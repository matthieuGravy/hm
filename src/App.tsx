import { Outlet, ScrollRestoration } from "react-router-dom";
import Topbar from "@/components/common/Topbar";

function App() {
  return (
    <>
      <Topbar />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default App;
