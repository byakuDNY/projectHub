"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavItem } from "./nav-item";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden h-full sm:ml-6 sm:flex sm:items-center sm:gap-8">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.name} {...item} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
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

export default Navbar;
