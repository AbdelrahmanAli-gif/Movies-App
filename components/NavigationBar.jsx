"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GiFilmProjector } from "react-icons/gi";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/genre", label: "Genre" },
  // { href: "/api-calls", label: "API Calls" },
];

const NavigationBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const enabled = storedTheme ? storedTheme === "dark" : prefersDark;

    setIsDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-black/100 text-white">
      <div className="px-6 md:px-16 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <GiFilmProjector size={32} className="text-red-500" />
          <span className="text-2xl font-bold ml-2">MoviesNest</span>
        </Link>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden md:flex gap-10 items-center">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-red-500 transition-colors ${
                  pathname === href ? "text-red-500" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          <button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-full hover:bg-white/10 transition"
          >
            {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        </ul>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-60 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 pb-4 bg-black/95 text-center">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block py-2 text-lg hover:text-red-500 ${
                  pathname === href ? "text-red-500" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
