"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Camera, Users, Lightbulb } from "lucide-react";
import NextImage from "next/image";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        title: "Technology & Professional Societies",
        icon: <Users size={20} />,
        items: [
            "IEEE RAS & CS (IIT Student Branch): Program & Logistics Coordinator for trademark events.",
            "IIT Toastmasters: Developing public speaking and impromptu communication skills.",
            "Rotaract Club of IIT: Engaging in community service and professional development."
        ]
    },
    {
        title: "Creative & Media",
        icon: <Camera size={20} />,
        items: [
            "IIT Media Society: Announcer, Photographer, and Graphic Designer.",
            "Choir: Exploring harmony and discipline through musical performance."
        ]
    },
    {
        title: "Social Impact & Youth Leadership",
        icon: <Lightbulb size={20} />,
        items: [
            "Sasnaka Sansada: STEM, English, and Computer Science Mentor.",
            "St. Joseph Vaz Youth Clubs: Leadership in local youth empowerment."
        ]
    }
];

export default function BeyondTheScreen() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const viewfinderRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Text focus animation (Subject)
        gsap.fromTo(".beyond-content-item", 
            { filter: "blur(15px)", opacity: 0.3, y: 20 },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "top 10%",
                    scrub: 1,
                },
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power2.out"
            }
        );

        // Photographer (Foreground) movement
        gsap.fromTo(imageRef.current,
            { x: 100, opacity: 0, scale: 0.9 },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "top 20%",
                    scrub: 1.5,
                },
                x: 0,
                opacity: 1,
                scale: 1,
                ease: "power3.out"
            }
        );

        // Viewfinder overlay
        gsap.fromTo(viewfinderRef.current,
            { opacity: 0, scale: 1.2 },
            {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    end: "top 10%",
                    scrub: 1,
                },
                opacity: 1,
                scale: 1,
                ease: "power2.out"
            }
        );

    }, { scope: sectionRef });

    return (
        <section 
            id="beyond" 
            ref={sectionRef} 
            className="relative min-h-screen bg-[#FDFDFD] py-32 px-6 md:px-24 overflow-hidden z-20"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative">
                
                {/* ──Subject: CONTENT (Left & Center) ── */}
                <div ref={textRef} className="lg:col-span-7 flex flex-col gap-12 z-10">
                    <div className="beyond-content-item">
                        <span className="text-sm font-sans font-bold tracking-[0.2em] text-[#888] uppercase mb-4 block">
                            Beyond the Screen /
                        </span>
                        <h2 className="text-4xl md:text-7xl font-heading font-black uppercase tracking-tighter text-[#1A1A1A] leading-[0.9]">
                            Community & <br /> Leadership
                        </h2>
                    </div>

                    <p className="beyond-content-item text-xl md:text-2xl text-[#555] font-sans font-medium leading-relaxed max-w-xl italic">
                        &quot;Engineering is about people as much as it is about pixels. My work in the community defines my approach to teamwork and communication.&quot;
                    </p>

                    <div className="flex flex-col gap-10">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="beyond-content-item group">
                                <div className="flex items-center gap-3 mb-4 text-[#1A1A1A]">
                                    <div className="p-2 border border-[#DDD] rounded-lg group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors duration-300">
                                        {cat.icon}
                                    </div>
                                    <h3 className="font-heading font-bold text-lg uppercase tracking-tight">{cat.title}</h3>
                                </div>
                                <ul className="flex flex-col gap-2 pl-12 border-l border-[#EEE]">
                                    {cat.items.map((item, i) => (
                                        <li key={i} className="text-sm md:text-base text-[#777] font-sans leading-snug">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Photographer: FOREGROUND ── */}
                <div className="lg:col-span-5 relative z-20 pointer-events-none">
                    <div className="relative aspect-[3/4] w-full">
                        {/* Viewfinder Overlay */}
                        <div 
                            ref={viewfinderRef}
                            className="absolute inset-0 z-30 pointer-events-none p-12"
                        >
                            {/* Brackets */}
                            <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-black/20 rounded-tl-sm" />
                            <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-black/20 rounded-tr-sm" />
                            <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-black/20 rounded-bl-sm" />
                            <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-black/20 rounded-br-sm" />
                            
                            {/* Center Crosshair */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                <div className="w-10 h-[1px] bg-black/10" />
                                <div className="h-10 w-[1px] bg-black/10 absolute" />
                            </div>

                            {/* Indicators */}
                            <div className="absolute top-14 left-1/2 -translate-x-1/2 text-[10px] text-black/30 font-sans font-bold tracking-[0.3em] uppercase">
                                REC ● 4K
                            </div>
                        </div>

                        {/* The Photographer Image (Transparent PNG) */}
                        <div ref={imageRef as unknown as React.Ref<HTMLDivElement>} className="absolute inset-0">
                            <NextImage 
                                src="/images/randilfernando_photography.png"
                                alt="Randil Fernando Photographer"
                                fill
                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                priority
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
