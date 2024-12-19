import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="transition-transform duration-200 ease-in-out hover:scale-105">
      <Image
        src="/favicon-light.svg"
        alt="ProjectHub Logo"
        width={40}
        height={40}
        className="dark:hidden"
      />
      <Image
        src="/favicon-dark.svg"
        alt="ProjectHub Logo"
        width={40}
        height={40}
        className="hidden dark:block"
      />
    </div>
    <span className="text-xl font-bold">ProjectHub</span>
  </Link>
);
