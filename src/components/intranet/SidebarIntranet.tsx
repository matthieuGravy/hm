import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, Users, LayoutDashboard } from "lucide-react";
import { Typography } from "@/components/common";
import { NavLink } from "react-router-dom";

const SidebarIntranet = () => {
  return (
    <aside className="flex w-64 flex-col space-y-6 border-r border-accent-subtle bg-accent p-4 text-accent-foreground">
      <header className="flex items-center justify-between">
        <Typography variant="h2">Intranet</Typography>
        <Avatar>
          <AvatarImage src="/avatar.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </header>
      <nav className="flex-1 space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <NavLink to="./dashboard">Dashboard</NavLink>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          <NavLink to="./employees">Employees</NavLink>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <svg
            className="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 9C3 7.89543 3.89543 7 5 7H9V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H19C20.1046 7 21 7.89543 21 9V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V9Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <NavLink to="./projects">Projects</NavLink>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          <NavLink to="./settings">Settings</NavLink>
        </Button>
      </nav>
    </aside>
  );
};

export { SidebarIntranet };
