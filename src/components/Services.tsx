"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import DevOpsTerminal from "./DevOpsTerminal";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Robotics & AI/ML",
        description: "Developing hardware-abstracted firmware and RAG-driven cloud backends for intelligent systems.",
        mediaType: "image",
        media: "/animation.gif"
    },
    {
        title: "Full-Stack & Backend",
        description: "Building scalable microservices with Go, Python (FastAPI), and Node.js.",
        mediaType: "video",
        media: "/4rent.lkrecording_fullstack.mp4"
    },
    {
        title: "DevOps & Infrastructure",
        description: "Implementing automated testing, Docker containerization, and enterprise-grade observability.",
        mediaType: "component",
        media: <DevOpsTerminal />
    }
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".service-row", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
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
        <section ref={containerRef} className="py-32 px-6 md:px-24 bg-[#EAE8E3] text-[#1A1A1A] min-h-screen relative z-10 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-sm font-sans tracking-widest text-[#888] uppercase mb-16">EXPERTISE /</h2>

                <div className="flex flex-col gap-24 lg:gap-32 w-full">
                    {services.map((service, idx) => (
                        <div key={idx} className={`service-row flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            
                            {/* Text Content */}
                            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter w-full">
                                    {service.title}
                                </h3>
                                <p className="font-sans text-xl md:text-2xl text-[#666] w-full font-medium">
                                    {service.description}
                                </p>
                            </div>

                            {/* Media Section */}
                            <div className="w-full lg:w-1/2">
                                {service.mediaType === "component" ? (
                                    <div className="w-full max-w-2xl mx-auto">
                                        {service.media}
                                    </div>
                                ) : (
                                    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-black/10 bg-white/20 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.02]">
                                        {/* Browser Header */}
                                        <div className="w-full h-8 sm:h-10 bg-[#D9D7D2]/80 flex items-center px-4 gap-2 border-b border-black/10">
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] shadow-sm" />
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
                                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] shadow-sm" />
                                        </div>
                                        {/* Image/Video Content */}
                                        <div className="relative w-full bg-white/50">
                                            {service.mediaType === "video" ? (
                                                <video
                                                    src={service.media as string}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    className="w-full h-auto max-h-[60vh] object-cover mix-blend-multiply"
                                                />
                                            ) : (
                                                <Image
                                                    src={service.media as string}
                                                    alt={service.title}
                                                    width={1280}
                                                    height={720}
                                                    unoptimized={(service.media as string).endsWith('.gif')}
                                                    className="w-full h-auto max-h-[60vh] object-contain mix-blend-multiply"
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
