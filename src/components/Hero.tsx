"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const isMobile = window.innerWidth < 768;

        gsap.from(".hero-char", {
            y: 100,
            opacity: 0,
            filter: isMobile ? "none" : "blur(20px)",
            duration: 1.5,
            stagger: 0.04,
            ease: "power4.out",
            delay: 2
        });

        gsap.from(".hero-bottom-element", {
            y: 40,
            opacity: 0,
            filter: isMobile ? "none" : "blur(10px)",
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            delay: 2.8
        });

        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2,
            },
            opacity: 0,
            filter: isMobile ? "none" : "blur(20px)",
            y: -100,
            ease: "power2.inOut"
        });

    }, { scope: containerRef });

    const title = "RANDIL FERNANDO";

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100svh] w-full flex flex-col items-center justify-start overflow-hidden bg-[#EAE8E3] z-10 pt-24 md:pt-20 pb-16"
        >
            {/* ── MOBILE LAYOUT (flex-col, stacked) ── */}
            <div className="flex flex-col items-center w-full md:hidden px-4 mt-4">

                {/* Name — two words on two lines so it fits mobile */}
                <h1 className="font-heading font-black uppercase tracking-tighter text-[#1A1A1A] text-center leading-[0.85] hover-target cursor-none w-full" style={{ fontSize: "clamp(3.5rem, 19vw, 7rem)" }}>
                    <span className="hero-char block">RANDIL</span>
                    <span className="hero-char block">FERNANDO</span>
                </h1>

                {/* Portrait centered below */}
                <div className="hero-bottom-element w-[80vw] max-w-[320px] -mt-6 relative z-10">
                    <NextImage
                        src="/images/randilfernando_pfp.png"
                        alt="Randil Fernando Portfolio"
                        width={320}
                        height={320}
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                {/* Description below image */}
                <div className="hero-bottom-element flex flex-col items-start w-full px-2 -mt-4 z-20 relative">
                    <ArrowDownRight size={18} strokeWidth={2} className="mb-3 text-[#1A1A1A]" />
                    <p className="text-sm text-[#555] font-sans font-medium leading-relaxed mb-6">
                        Full-Stack Developer, Robotics Lead & Public Speaker. Building the future at the intersection of Hardware, AI, and Cloud Infrastructure.
                    </p>
                    <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-2 bg-[#1A1A1A] text-[#EAE8E3] px-6 py-3 rounded-full font-sans font-bold text-[10px] tracking-widest uppercase hover:bg-[#333] transition-colors shadow-xl">
                        CONTACT <ArrowUpRight size={14} strokeWidth={2} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* ── DESKTOP LAYOUT (centered overlap, locked to viewport) ── */}
            <div className="hidden md:flex relative w-full h-[100svh] flex-col items-center justify-start pointer-events-none z-10 overflow-hidden pt-[6vh]">

                {/* Text Layer */}
                <h1 className="flex justify-center whitespace-nowrap text-[12vw] lg:text-[10.5vw] xl:text-[9.5vw] font-heading font-black leading-[0.85] tracking-tighter uppercase text-[#1A1A1A] w-full cursor-none hover-target relative z-10 transition-colors duration-500 hover:text-[#444]">
                    {title.split("").map((char, index) => (
                        <span
                            key={index}
                            className="hero-char inline-block"
                            style={{ width: char === " " ? "0.3em" : "auto" }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>

                {/* Overlapping Image Layer — clipped at section bottom */}
                <div className="hero-bottom-element w-[55vw] max-w-[650px] -mt-[10vw] flex justify-center relative z-20">
                    <NextImage
                        src="/images/randilfernando_pfp.png"
                        alt="Randil Fernando Portfolio"
                        width={650}
                        height={650}
                        className="w-full h-auto object-contain"
                        priority
                    />
                    {/* Subtle bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-gradient-to-t from-[#EAE8E3] to-transparent pointer-events-none" />
                </div>

                {/* Content floating bottom-left — positioned to avoid image overlap */}
                <div className="absolute bottom-44 left-[5vw] lg:left-[8vw] xl:left-[10vw] z-30 pointer-events-none max-w-[280px] lg:max-w-[340px]">
                    <div className="hero-bottom-element flex flex-col items-start pointer-events-auto">
                        <ArrowDownRight size={20} strokeWidth={2} className="mb-4 text-[#1A1A1A]" />
                        <p className="text-base lg:text-lg text-[#555] font-sans font-medium leading-relaxed mb-6 mix-blend-multiply">
                            Full-Stack Developer, Robotics Lead & Public Speaker. Building the future at the intersection of Hardware, AI, and Cloud Infrastructure.
                        </p>
                        <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-3 bg-[#1A1A1A] text-[#EAE8E3] px-7 py-3.5 rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#333] transition-colors hover-target cursor-none shadow-xl">
                            CONTACT <ArrowUpRight size={16} strokeWidth={2} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
