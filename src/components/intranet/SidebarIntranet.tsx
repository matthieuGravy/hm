import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  Users,
  LayoutDashboard,
  MessageSquare,
  Clipboard,
  Briefcase,
} from "lucide-react";
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
        <NavLink
          to="./dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center w-full p-2 text-accent-foreground bg-accent-focus rounded"
              : "flex items-center w-full p-2 text-accent-foreground hover:bg-accent-focus rounded"
          }
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink
          to="./messages"
          className={({ isActive }) =>
            isActive
              ? "flex items-center w-full p-2 text-accent-foreground bg-accent-focus rounded"
              : "flex items-center w-full p-2 text-accent-foreground hover:bg-accent-focus rounded"
          }
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </NavLink>
        <NavLink
          to="./tasks"
          className={({ isActive }) =>
            isActive
              ? "flex items-center w-full p-2 text-accent-foreground bg-accent-focus rounded"
              : "flex items-center w-full p-2 text-accent-foreground hover:bg-accent-focus rounded"
          }
        >
          <Clipboard className="mr-2 h-4 w-4" />
          Tasks
        </NavLink>
        <NavLink
          to="./employees"
          className={({ isActive }) =>
            isActive
              ? "flex items-center w-full p-2 text-accent-foreground bg-accent-focus rounded"
              : "flex items-center w-full p-2 text-accent-foreground hover:bg-accent-focus rounded"
          }
        >
          <Users className="mr-2 h-4 w-4" />
          Employees
        </NavLink>
        <NavLink
          to="./projects"
          className={({ isActive }) =>
            isActive
              ? "flex items-center w-full p-2 text-accent-foreground bg-accent-focus rounded"
              : "flex items-center w-full p-2 text-accent-foreground hover:bg-accent-focus rounded"
          }
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Projects
        </NavLink>
        <NavLink
          to="./settings"
          className={({ isActive }) =>
            isActive
              ? "flex items-center w-full p-2 text-accent-foreground bg-accent-focus rounded"
              : "flex items-center w-full p-2 text-accent-foreground hover:bg-accent-focus rounded"
          }
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export { SidebarIntranet };
