import { useState } from "react";
import { useLocation, Link, NavLink } from "react-router";

import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
];

const AUTH_LINKS = [
  { label: "Login", href: "/auth/login", variant: "ghost" },
  { label: "Register", href: "/auth/register", variant: "default" },
] as const;

function NavigationLink({ href, label }: { href: string; label: string }) {
  return (
    <NavigationMenuItem>
      <NavLink
        to={href}
        className={({ isActive }) => {
          return cn(
            navigationMenuTriggerStyle(),
            isActive ? "font-bold" : "opacity-80",
          );
        }}
      >
        {label}
      </NavLink>
    </NavigationMenuItem>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Eventify</span>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map(({ href, label }) => (
              <NavigationLink key={href} href={href} label={label} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Auth">
          {AUTH_LINKS.map(({ href, label, variant }) => (
            <Button key={href} variant={variant} size="sm" asChild>
              <Link to={href}>{label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 p-10">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {label}
                </Link>
              ))}

              <div className="my-3 border-t border-border" />

              {AUTH_LINKS.map(({ href, label, variant }) => (
                <Button
                  key={href}
                  variant={variant as "ghost" | "default"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={href} onClick={() => setMobileOpen(false)}>
                    {label}
                  </Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
