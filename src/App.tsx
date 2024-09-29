import { Outlet, ScrollRestoration } from "react-router-dom";
import { TopNav } from "@/components/common/";

function App() {
  return (
    <>
      <TopNav />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default App;
