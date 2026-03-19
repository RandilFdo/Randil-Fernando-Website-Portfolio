"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        document.body.classList.add("no-scroll");

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.classList.remove("no-scroll");
                setIsComplete(true);
            },
            delay: 0.2
        });

        // The half white circle morphs and scales up to cover the black background
        tl.to(circleRef.current, {
            scale: 15,
            duration: 1.5,
            ease: "power4.inOut",
        })
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            }, "-=0.2");

    }, { scope: containerRef });

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] bg-[#111111] flex flex-col justify-end items-center overflow-hidden pointer-events-none"
        >
            <div
                ref={circleRef}
                className="w-[20vw] h-[20vw] bg-background rounded-full translate-y-1/2"
                style={{ transformOrigin: "center center" }}
            />
        </div>
    );
}
