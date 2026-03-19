"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Robotics & AI/ML",
        description: "Developing hardware-abstracted firmware and RAG-driven cloud backends for intelligent systems.",
    },
    {
        title: "Full-Stack & Backend",
        description: "Building scalable microservices with Go, Python (FastAPI), and Node.js.",
    },
    {
        title: "DevOps & Infrastructure",
        description: "Implementing automated testing, Docker containerization, and enterprise-grade observability.",
    }
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".service-item", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        // scroll out blur
        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom top+=200",
                end: "bottom top",
                scrub: true,
            },
            filter: "blur(20px)",
            opacity: 0,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-24 bg-[#EAE8E3] text-[#1A1A1A] min-h-screen flex flex-col justify-center relative z-10">
            <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-sm font-sans tracking-widest text-[#888] uppercase mb-16">EXPERTISE /</h2>

                <div className="flex flex-col gap-12 md:gap-24">
                    {services.map((service, idx) => (
                        <div key={idx} className="service-item flex flex-col md:flex-row gap-6 md:gap-24 items-start md:items-center border-b border-[#CCC] pb-12 hover-view cursor-none group">
                            <h3 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tighter w-full md:w-1/2 group-hover:translate-x-4 transition-all duration-500">
                                {service.title}
                            </h3>
                            <p className="font-sans text-xl md:text-2xl text-[#666] w-full md:w-1/2 font-medium">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
