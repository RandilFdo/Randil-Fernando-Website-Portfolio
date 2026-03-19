"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Terminal, Box, Server, Infinity, Activity, Cpu, Database, Code, Layout, Workflow, Settings, Cloud, Network, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
    { name: "React / Next.js", icon: <Layout size={28} />, colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
    { name: "Node.js", icon: <Server size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
    { name: "TypeScript", icon: <Code size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Python / FastAPI", icon: <Terminal size={28} />, colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
    { name: "Go (Golang)", icon: <Network size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Docker", icon: <Box size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Kubernetes", icon: <Workflow size={28} />, colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
    { name: "Jenkins CI/CD", icon: <Infinity size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Terraform", icon: <Settings size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "AWS", icon: <Cloud size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-2" },
    { name: "Prometheus", icon: <Activity size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Grafana", icon: <Cpu size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "PostgreSQL", icon: <Database size={28} />, colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
    { name: "MongoDB", icon: <Database size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Redis", icon: <Database size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Linux", icon: <Terminal size={28} />, colSpan: "md:col-span-2", rowSpan: "md:row-span-1" },
    { name: "C++ / Kotlin", icon: <Code size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
    { name: "Asgardeo", icon: <Shield size={28} />, colSpan: "md:col-span-1", rowSpan: "md:row-span-1" },
];

export default function BentoGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".bento-item", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
        });

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
        <section ref={containerRef} className="py-32 px-6 md:px-24 bg-[#EAE8E3] min-h-screen flex flex-col justify-center z-10 relative">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-4xl md:text-7xl font-heading font-black mb-16 uppercase tracking-tighter text-[#1A1A1A]">
                    Tech Stack /
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[180px]">
                    {techStack.map((tech, idx) => (
                        <div
                            key={idx}
                            className={`bento-item bg-white border border-[#DDD] shadow-sm p-4 md:p-6 rounded-2xl flex flex-col justify-between transition-colors group ${tech.colSpan} ${tech.rowSpan} hover-target hover:bg-[#1A1A1A]`}
                        >
                            <div className="text-[#888] group-hover:text-white transition-colors duration-300">
                                {tech.icon}
                            </div>
                            <h3 className="text-sm md:text-lg font-bold font-sans tracking-tight text-[#1A1A1A] group-hover:text-white transition-colors duration-300 mt-2 leading-tight">{tech.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
