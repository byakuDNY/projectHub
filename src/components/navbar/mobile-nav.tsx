import Link from "next/link";

export const MobileNav = ({
  items,
  pathname,
  closeMobileMenu,
}: {
  items: Array<{ name: string; href: string }>;
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
              className={`block px-4 py-2 text-base font-medium transition-colors ${
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
