"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloudSun, Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-linear-to-br from-sky-500 to-cyan-400 text-white group-hover:scale-110 transition-transform">
            <CloudSun className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-sky-600 to-cyan-500 dark:from-sky-400 dark:to-cyan-300 bg-clip-text text-transparent">
            SkyCast
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    active
                      ? "bg-sky-500 text-white shadow-md shadow-sky-500/30"
                      : "text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-white/10"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2 text-gray-700 dark:text-gray-200"><ThemeToggle /></li>
        </ul>

        {/* Mobile button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/30 dark:hover:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/20 px-4 pb-4 animate-slide-up">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition",
                    pathname === l.href
                      ? "bg-sky-500 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-white/10"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-end pt-3"><ThemeToggle /></div>
        </div>
      )}
    </header>
  );
}