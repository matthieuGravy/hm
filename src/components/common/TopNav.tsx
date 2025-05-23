import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Button,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { ThemeToggle, Modal, LanguageToggle } from "@/components/common";
import { LoginForm, RegistrationForm } from "@/components/authentication";
import { useModalStore } from "@/stores/modalStore";

export const TopNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useModalStore();

  const links = [
    { path: "/contact", title: "Contact" },
    { path: "/about", title: "About" },
    { path: "/intranet", title: "Intranet" },
  ];

  const openSignUpModal = () => {
    openModal("signup");
  };

  const openLoginModal = () => {
    openModal("login");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <NavLink to="/" className="text-2xl font-bold text-foreground">
            Logo
          </NavLink>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
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

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={openLoginModal} variant="outline">
              Login
            </Button>
            <Button onClick={openSignUpModal}>Sign Up</Button>
            <ThemeToggle />
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden p-4 space-y-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </NavLink>
            ))}
            <Button
              onClick={() => {
                openLoginModal();
                setIsMobileMenuOpen(false);
              }}
              variant="outline"
              className="w-full"
            >
              Login
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                openSignUpModal();
                setIsMobileMenuOpen(false);
              }}
            >
              Sign Up
            </Button>
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        )}
      </header>

      <Modal type="signup">
        <RegistrationForm onSwitchToLogin={openLoginModal} />
      </Modal>
      <Modal type="login">
        <LoginForm onSwitchToSignUp={openSignUpModal} />
      </Modal>
    </>
  );
};
