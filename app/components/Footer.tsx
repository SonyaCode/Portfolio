"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const socialMedias = [
    { name: "Gmail", href: "mailto:z.sonya2829@gmail.com", image: "/assets/google-icon.svg" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/sonya-zheng-a19b39285/", image: "/assets/linkedin-icon.svg" },
    { name:"GitHub", href: "https://github.com/SonyaCode", image: "/assets/github-icon.svg" }
];

export default function Footer() {
    return (
        <div className="bg-dark-bluish-purple flex justify-center p-4">
            {socialMedias.map((icon) => (
                <a href={icon.href} key={icon.href} className=""><img src={icon.image} alt={icon.name} className="m-2 w-8"/></a>
            ))}
        </div>
    );
}