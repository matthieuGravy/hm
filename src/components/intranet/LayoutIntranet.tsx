import { SidebarIntranet } from "@/components/intranet/index";
import { Outlet } from "react-router-dom";

interface LayoutIntranetProps {
  children: React.ReactNode;
}

const LayoutIntranet: React.FC<LayoutIntranetProps> = () => {
  return (
    <div className="flex flex-row">
      <SidebarIntranet />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export { LayoutIntranet };
