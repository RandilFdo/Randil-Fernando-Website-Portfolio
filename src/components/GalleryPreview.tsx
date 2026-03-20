"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function GalleryPreview() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Continuous marquee animation
        if (textRef.current) {
            gsap.to(textRef.current, {
                xPercent: -50,
                ease: "none",
                duration: 20,
                repeat: -1
            });
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current || !cursorRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(cursorRef.current, {
            x: x,
            y: y,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });
    };

    return (
        <section 
            ref={containerRef}
            onClick={() => router.push('/canvas')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="w-full py-32 bg-[#1A1A1A] text-[#EAE8E3] relative overflow-hidden cursor-none z-10 select-none group"
        >
            {/* Custom Interactive Cursor */}
            <div 
                ref={cursorRef}
                className="absolute top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
                <div className={`transition-all duration-500 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center font-sans font-bold text-sm tracking-widest ${isHovered ? 'w-32 h-32 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'}`}>
                    EXPLORE
                </div>
            </div>

            <div className="absolute inset-0 opacity-10 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>
            
            <div className="flex whitespace-nowrap overflow-visible">
                <div ref={textRef} className="flex gap-16 items-center px-8 min-w-max">
                    {/* Repeat the text twice to seamlessly loop since we move to -50% */}
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-16 items-center">
                            <h2 className="text-8xl md:text-[12rem] font-heading font-black tracking-tighter uppercase leading-none group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#EAE8E3] transition-all duration-500">
                                GRAPHIC DESIGN
                            </h2>
                            <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-[#EAE8E3] group-hover:scale-50 transition-transform duration-500"></div>
                            <h2 className="text-8xl md:text-[12rem] font-heading font-black tracking-tighter uppercase leading-none group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#EAE8E3] transition-all duration-500">
                                THE CANVAS
                            </h2>
                            <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-[#EAE8E3] group-hover:scale-50 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
            
        </section>
    );
}
