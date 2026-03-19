"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { projects } from "@/data/projects";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray(".horizontal-item") as HTMLElement[];

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                end: () => "+=" + scrollRef.current?.offsetWidth,
            }
        });

        tl.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
        });

        // Parallax images
        sections.forEach((section) => {
            const img = section.querySelector("img");
            if (img) {
                gsap.to(img, {
                    xPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: tl,
                        start: "left right",
                        end: "right left",
                        scrub: true,
                    }
                });
            }
        });

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

    return (
        <section id="works" ref={containerRef} className="relative h-screen flex items-center bg-[#EAE8E3] overflow-hidden z-20">
            <div className="absolute top-12 left-12 z-10 text-[#1A1A1A]">
                <h2 className="text-sm font-sans tracking-widest text-[#666] uppercase">SELECTED WORKS /</h2>
            </div>

            <div ref={scrollRef} className="flex h-full w-[800vw]">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="horizontal-item w-screen h-full flex items-center justify-center p-6 md:p-24"
                    >
                        <Link href={`/works/${project.slug}`} className="relative w-full max-w-7xl h-auto md:h-[70vh] flex flex-col md:flex-row items-center gap-8 md:gap-12 group cursor-pointer pb-12 md:pb-0 block">

                            <div className="w-full md:w-[60%] h-[40vh] md:h-full relative overflow-hidden rounded-2xl bg-[#DCD9D4] mt-16 md:mt-0 shadow-xl pointer-events-none">
                                <div className="absolute inset-0 bg-[#EAE8E3]"></div>

                                <NextImage
                                    src={`/images/${project.img}`}
                                    alt={`Randil Fernando - ${project.title} Portfolio`}
                                    fill
                                    className="object-cover pointer-events-none"
                                />
                            </div>

                            <div className="w-full md:w-[40%] flex flex-col justify-center pointer-events-none">
                                <span className="text-sm font-sans tracking-widest text-[#888] mb-4 transition-colors duration-700 group-hover:text-[#1A1A1A]">0{project.id}</span>
                                <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter mb-4 text-[#1A1A1A] leading-none transition-transform duration-700 group-hover:translate-x-4">
                                    {project.title}
                                </h3>
                                <h4 className="text-xl md:text-2xl font-sans text-[#444] font-bold mb-4">{project.subtitle}</h4>
                                <p className="text-[#666] text-lg font-sans font-normal">{project.desc}</p>

                                <div className="mt-8">
                                    <span className="inline-block border border-[#1A1A1A] text-[#1A1A1A] px-6 py-3 rounded-full font-sans font-bold text-xs tracking-widest uppercase group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors duration-300">
                                        View Case Study
                                    </span>
                                </div>
                            </div>

                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
