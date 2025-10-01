"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issue", href: "/issues" },
  ];
  return (
    <>
      <nav className="flex space-x-10 border-b mb-5 px-5 h-14 items-center">
        <Link href="/">Logo</Link>
        <ul className="flex space-x-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classnames({
                "text-gray-200 font-bold": link.href == currentPath,
                "hover:text-gray-400 hover:font-bold transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
