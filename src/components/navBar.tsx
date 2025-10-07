"use client";

import React,{ useEffect, useState } from "react";
import Link from "next/link";

const NavBar = () => {

    const [activeSection, setActiveSection] = useState("home");

    const navItems = [
        { name: "Home", link: "#home", id: "home"},
        { name: "About", link: "#about", id: "about"},
        { name: "Projects", link: "#projects", id: "projects"},
        { name: "Experience", link: "#experience", id: "experience"},
        { name: "Contact", link: "#contact", id: "contact"},
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.id);
            const scrollPosition = window.scrollY + 100; // Offset for better detection

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        // Set initial active section
        handleScroll();

        // Add scroll listener
        window.addEventListener("scroll", handleScroll);
        
        // Cleanup
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div
            className="fixed w-full top-0 z-50 transition-all duration-500"
        >
            <div className="flex justify-end"> 

                {/* Desktop Navigation */}
                <div className="flex space-x-6 mr-3 p-4 hidden md:block">
                    {navItems.map(({ name, link, id }, index) => {
                        const isActive = activeSection === id;
                        return (
                            <Link
                                key={index}
                                href={link}
                                className="group relative px-1 py-2 text-sm font-semibold"
                            >
                                <span
                                    className={`z-10 transition-colors duration-300 ${
                                        isActive
                                        ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
                                        : "text-[#e2d3fd] group-hover:text-white"
                                    }`}
                                >
                                 {name}
                                </span>
                                <span
                                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                                        isActive
                                            ? "scale-x-100"
                                            : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                ></span>
                            </Link>
                        ); 
                    })}
                </div>
            </div>
        </div>
    );
};


export default NavBar;