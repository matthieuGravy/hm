import { SidebarIntranet } from "@/components/intranet/index";
import { Outlet } from "react-router-dom";

interface LayoutIntranetProps {
  children: React.ReactNode;
}

const LayoutIntranet: React.FC<LayoutIntranetProps> = () => {
  return (
    <div className="flex flex-row max-w-6xl mx-auto">
      <SidebarIntranet />

      <Outlet />
    </div>
  );
};

export { LayoutIntranet };
