"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true });

        tl.current.to(menuRef.current, {
            clipPath: "circle(150% at calc(100% - 3rem) 3rem)",
            duration: 0.8,
            ease: "power3.inOut"
        });

        tl.current.from(".menu-link", {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.4");

    }, { scope: menuRef });

    const toggleMenu = () => {
        if (isOpen) {
            tl.current?.reverse();
            document.body.style.overflow = "";
        } else {
            tl.current?.play();
            document.body.style.overflow = "hidden";
        }
        setIsOpen(!isOpen);
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        if (window.location.pathname === "/") {
            e.preventDefault();
            gsap.to(window, {
                duration: 1.5,
                scrollTo: hash === "top" ? 0 : hash,
                ease: "power4.inOut"
            });
        }
    };

    const handleMobileSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
        if (window.location.pathname === "/") {
            e.preventDefault();
            toggleMenu();
            setTimeout(() => {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: hash === "top" ? 0 : hash,
                    ease: "power4.inOut"
                });
            }, 600);
        } else {
            toggleMenu();
        }
    };

    return (
        <>
            {/* Standard Navbar */}
            <nav className={`fixed top-0 left-0 w-full p-8 flex justify-between items-center z-40 transition-transform duration-500 mix-blend-difference text-white ${scrolled ? "-translate-y-full" : "translate-y-0"}`}>
                <div className="font-sans text-sm font-medium uppercase tracking-widest">Master of None</div>
                <div className="flex gap-6 font-sans text-sm font-medium">
                    <a href="/#about" onClick={(e) => handleSmoothScroll(e, "#about")} className="hover-target">About</a>
                    <a href="/#works" onClick={(e) => handleSmoothScroll(e, "#works")} className="hover-target">Works</a>
                    <a href="/#contact" onClick={(e) => handleSmoothScroll(e, "#contact")} className="hover-target">Contact</a>
                    <a href="/cv" className="hover-target pointer-events-auto">CV</a>
                </div>
            </nav>

            {/* Floating Morphing Button */}
            <button
                onClick={toggleMenu}
                className={`fixed top-6 right-6 w-14 h-14 bg-[#111] rounded-full z-[100] flex flex-col items-center justify-center gap-1.5 transition-all duration-500 hover-target shadow-lg hover:scale-105 ${scrolled || isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}
            >
                <div className={`w-6 h-[2px] bg-white transition-transform duration-300 origin-center ${isOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
                <div className={`w-6 h-[2px] bg-white transition-transform duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
            </button>

            {/* Full screen menu overlay */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-[#111111] text-[#EAE8E3] z-50 flex flex-col justify-center px-12 md:px-32"
                style={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            >
                <div className="flex flex-col text-6xl md:text-8xl font-heading font-black tracking-tighter uppercase leading-none gap-2">
                    <a href="/" onClick={(e) => handleMobileSmoothScroll(e, "top")} className="menu-link hover:text-white transition-colors w-fit hover-target">Home</a>
                    <a href="/#about" onClick={(e) => handleMobileSmoothScroll(e, "#about")} className="menu-link hover:text-white transition-colors w-fit hover-target">About</a>
                    <a href="/#works" onClick={(e) => handleMobileSmoothScroll(e, "#works")} className="menu-link hover:text-white transition-colors w-fit hover-target">Works</a>
                    <a href="/#contact" onClick={(e) => handleMobileSmoothScroll(e, "#contact")} className="menu-link hover:text-white transition-colors w-fit hover-target">Contact</a>
                    <a href="/cv" onClick={toggleMenu} className="menu-link hover:text-white transition-colors w-fit hover-target pointer-events-auto">CV</a>
                </div>

                <div className="absolute bottom-12 left-12 md:left-32 flex flex-col gap-4 font-sans text-xs uppercase tracking-widest text-[#888]">
                    <div>
                        <p className="mb-1">Email Address</p>
                        <a href="mailto:dev.randilfernando@gmail.com" className="text-white hover-target cursor-none block">dev.randilfernando@gmail.com</a>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <a href="#" className="hover:text-white hover-target cursor-none">LinkedIn</a>
                        <a href="#" className="hover:text-white hover-target cursor-none">GitHub</a>
                    </div>
                </div>
            </div>
        </>
    );
}
