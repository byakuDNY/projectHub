import Link from "next/link";

export const NavItem = ({
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
      className={`relative px-1 py-2 text-sm font-medium transition-colors ${
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
      }`}>
      {name}
      {isActive && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
      )}
    </Link>
  );
};
