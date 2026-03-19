"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

const BeanModel = dynamic(() => import("./BeanModel"), { ssr: false });

export default function Neurobloom() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".neuro-element", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
        });

        const isMobile = window.innerWidth < 768;

        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom top+=200",
                end: "bottom top",
                scrub: true,
            },
            filter: isMobile ? "none" : "blur(20px)",
            opacity: 0,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-24 bg-[#050505] text-[#EAE8E3] min-h-screen flex flex-col justify-center overflow-hidden z-20">
            <div className="max-w-6xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 neuro-element">
                    <div>
                        <h2 className="text-sm font-sans tracking-widest text-[#888] uppercase mb-4">STARTUP / ROBOTICS</h2>
                        <h3 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-none text-white">
                            Neurobloom
                        </h3>
                    </div>
                    <p className="text-xl md:text-2xl text-[#888] font-sans max-w-md mt-6 md:mt-0 font-medium leading-relaxed">
                        Building the next generation of autonomous robotic systems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                    <div className="neuro-element md:col-span-8 bg-[#111] border border-[#222] rounded-3xl overflow-hidden relative group min-h-[400px]">
                        <NextImage
                            src="/images/randilfernando_neurobloom.jpeg"
                            alt="Randil Fernando - Neurobloom Robot Portfolio"
                            fill
                            className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
                        <div className="absolute top-8 right-8 bg-[#EAE8E3] text-black font-sans font-bold py-2 px-6 rounded-full rotate-[-12deg] shadow-xl text-sm md:text-base hover-target z-20">
                            v2.0 LIVE
                        </div>
                    </div>

                    <div className="neuro-element md:col-span-4 flex flex-col gap-6 min-h-[300px] md:min-h-[400px]">
                        <div className="flex-1 bg-[#0a0a0a] border border-[#222] rounded-3xl overflow-hidden relative group min-h-[300px] md:min-h-[250px]">
                            {/* Interactive 3D Model */}
                            <BeanModel />
                            {/* Label overlay at bottom */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
                                <span className="bg-[#111]/80 backdrop-blur-sm text-[#888] font-sans text-[10px] tracking-widest uppercase px-4 py-2 rounded-full border border-[#333]">
                                    Drag to rotate
                                </span>
                            </div>
                        </div>
                        <div className="flex-[0.8] bg-[#EAE8E3] text-[#1A1A1A] border border-[#111] rounded-3xl overflow-hidden relative group p-8 flex flex-col justify-between hover-target z-10">
                            <h4 className="font-heading font-black text-3xl uppercase tracking-tighter">Impact</h4>
                            <p className="font-sans font-medium text-sm md:text-base mt-2 text-[#444]">Revolutionizing edge computing and physics-based motion control.</p>
                            <div className="self-end bg-[#1A1A1A] text-white font-sans font-bold py-1 px-4 rounded-full rotate-[5deg] mt-4 text-xs md:text-sm shadow-sm">
                                2024
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
