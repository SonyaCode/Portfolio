"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
    { href: "/", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" }
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative">
            <div className="flex p-2 ms-3 justify-between">
                <Link href="/">
                    <img src="/assets/name-logo.svg" alt="Logo" />
                </Link>

                {/* Desktop links */}
                <ul className="gap-8 md:flex hidden items-center me-20">
                    {links.map((link) => (
                        <li key={link.href} className="me-5">
                            <Link href={link.href} onClick={() => setIsOpen(false)} className={`transition-colors hover:text-gray-600 ${pathname === link.href ? "font-semibold" : "text-gray-700"}`}>{link.label}</Link>
                        </li>
                    ))}
                </ul>


                {/* Mobile hamburger menu */}
                <button
                className="block md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
                >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isOpen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                    ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    )}
                </svg>
                </button>

                {/* Mobile menu items */}
                    <div
                        className={`absolute left-0 right-0 top-full z-20 overflow-hidden bg-white shadow-md transition-[max-height] duration-300 ease-in-out md:hidden ${
                        isOpen ? "max-h-96" : "max-h-0"
                        }`}
                    >
                        <ul className="flex flex-col gap-1 px-4 py-4">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                            <li key={link.href}>
                                <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-lg px-3 py-2 transition-colors ${
                                    isActive
                                    ? "font-semibold"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                >
                                {link.label}
                                </Link>
                            </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
        </nav>

    )
}
