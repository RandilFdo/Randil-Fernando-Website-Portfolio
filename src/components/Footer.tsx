"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // Infinite marquee
        const marquee = marqueeRef.current;
        if (marquee) {
            gsap.to(marquee.children, {
                xPercent: -100,
                repeat: -1,
                duration: 20,
                ease: "none",
            });
        }

        // Magnetic button
        const btn = buttonRef.current;
        const bodyText = btn?.querySelector("span");

        if (btn && bodyText) {
            const mouseMove = (e: MouseEvent) => {
                const { left, top, width, height } = btn.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                gsap.to(btn, {
                    x: mouseX * 0.4,
                    y: mouseY * 0.4,
                    duration: 1,
                    ease: "power3.out"
                });

                gsap.to(bodyText, {
                    x: mouseX * 0.1,
                    y: mouseY * 0.1,
                    duration: 1,
                    ease: "power3.out"
                });
            };

            const mouseLeave = () => {
                gsap.to(btn, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
                gsap.to(bodyText, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            };

            btn.addEventListener("mousemove", mouseMove);
            btn.addEventListener("mouseleave", mouseLeave);

            return () => {
                btn.removeEventListener("mousemove", mouseMove);
                btn.removeEventListener("mouseleave", mouseLeave);
            };
        }
    }, []);

    return (
        <footer id="contact" className="relative bg-[#050505] text-[#EAE8E3] overflow-hidden pt-48 pb-8 flex flex-col z-20 min-h-[80vh]">

            {/* Massive Outlined Marquee Background */}
            <div
                ref={marqueeRef}
                className="absolute top-1/2 left-0 -translate-y-1/2 flex whitespace-nowrap pointer-events-none opacity-20"
            >
                <div className="text-[25vw] font-heading font-black tracking-tighter mx-4 outline-text">
                    RANDIL FERNANDO
                </div>
                <div className="text-[25vw] font-heading font-black tracking-tighter mx-4 outline-text">
                    RANDIL FERNANDO
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-24 flex flex-col items-center justify-center flex-1 mb-32">
                <h2 className="text-5xl md:text-8xl font-heading font-bold mb-12 text-center tracking-tighter">Let&apos;s build the impossible.</h2>

                <a
                    href="mailto:dev.randilfernando@gmail.com"
                    ref={buttonRef}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white text-[#050505] flex items-center justify-center shadow-2xl transition-colors hover:bg-[#EAE8E3] pointer-events-auto relative z-50"
                >
                    <span className="text-xl md:text-3xl font-heading font-bold tracking-tight pointer-events-none">Get in Touch</span>
                </a>
            </div>

            <div className="relative z-10 container mx-auto px-6 md:px-24 flex flex-col md:flex-row justify-between items-end border-t border-[#333] pt-8">
                <div className="flex gap-8 mb-8 md:mb-0">
                    <a href="https://www.linkedin.com/in/randil-fernando-in/" target="_blank" rel="noopener noreferrer" className="text-lg font-sans font-medium uppercase tracking-widest hover:text-white hover:scale-110 transition-all hover-target cursor-none inline-block">LinkedIn</a>
                    <a href="https://github.com/RandilFdo" target="_blank" rel="noopener noreferrer" className="text-lg font-sans font-medium uppercase tracking-widest hover:text-white hover:scale-110 transition-all hover-target cursor-none inline-block">GitHub</a>
                    <a href="https://medium.com/@randilfernando829" target="_blank" rel="noopener noreferrer" className="text-lg font-sans font-medium uppercase tracking-widest hover:text-white hover:scale-110 transition-all hover-target cursor-none inline-block">Medium</a>
                </div>

                <p className="text-[#888] font-sans text-xs tracking-widest uppercase text-right md:text-left leading-relaxed">
                    © {new Date().getFullYear()} Randil Fernando.<br className="block md:hidden" /> All rights reserved. Built for performance.
                </p>
            </div>
        </footer>
    );
}
