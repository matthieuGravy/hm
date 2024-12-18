import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
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
      </nav>
    </aside>
  );
};

export { SidebarIntranet };
