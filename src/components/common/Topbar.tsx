import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const links = [
    { path: "/contact", title: "Contact" },
    { path: "/about", title: "About" },
    { path: "/intranet", title: "Intranet" },
  ];

  return (
    <header className="border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <NavLink to="/" className="text-2xl font-bold text-foreground">
          Logo
        </NavLink>
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuLink asChild>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50",
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )
                    }
                  >
                    {link.title}
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
