"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Menu, X } from "lucide-react";

import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">📦 Logo</span>
        </Link>

        <nav className="hidden h-full sm:ml-6 sm:flex sm:items-center sm:gap-8">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.name} {...item} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserDropdownMenu />
          <Button
            variant="ghost"
            size="icon"
            className="border sm:hidden"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileNav
          items={NAV_ITEMS}
          pathname={pathname}
          closeMobileMenu={closeMobileMenu}
        />
      )}
    </header>
  );
};

const NavItem = ({
  name,
  href,
  pathname,
}: {
  name: string;
  href: string;
  pathname: string;
}) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`px-1 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "border-b-2 border-primary text-primary"
          : "text-muted-foreground hover:border-b-2 hover:border-primary hover:text-primary"
      }`}>
      {name}
    </Link>
  );
};

const MobileNav = ({
  items,
  pathname,
  closeMobileMenu,
}: {
  items: typeof NAV_ITEMS;
  pathname: string;
  closeMobileMenu: () => void;
}) => {
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="border-t bg-background sm:hidden">
      <ul className="flex flex-col space-y-1 py-2">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`block px-4 py-2 text-base font-medium ${
                isActive(item.href)
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-primary"
              }`}
              onClick={closeMobileMenu}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const UserDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>EC</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">View Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/chat">My Conversations </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/mis-materiales">My Materials</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log Out </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
