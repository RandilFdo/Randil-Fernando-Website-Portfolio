"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Scroll out blur
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

    const text = "I’m a developer who lives for the 'impossible' build. Whether I’m sprinting through the butterfly stroke as an Island 1st swimmer, or architecting a physics-based emotion engine for a robot dog, I thrive on high-performance execution. I’m a music lover at the keys and a public speaker on the stage, but at my core, I am a builder. I don't just write code; I orchestrate systems, from AI-driven microservices to Cloud-Native CI/CD pipelines. I build fast, I build loud, and I build to scale.";
    const words = text.split(" ");

    return (
        <section id="about" ref={containerRef} className="py-32 px-6 md:px-24 bg-[#111111] text-[#EAE8E3] min-h-screen flex items-center justify-center relative z-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-sm font-sans tracking-widest text-[#888] uppercase mb-12">THE POLYMATH /</h2>

                <p className="about-text text-3xl md:text-5xl lg:text-7xl font-sans font-medium leading-[1.2] md:leading-[1.1] tracking-tight">
                    {words.map((word, idx) => {
                        // Highlighting key elements with white, standard ones with #AAAAAA globally
                        return (
                            <span key={idx} className="mr-3 md:mr-4 lg:mr-5 hover:text-white transition-colors duration-300 inline-block text-[#999] hover-target">
                                {word}
                            </span>
                        )
                    })}
                </p>
            </div>
        </section>
    );
}
