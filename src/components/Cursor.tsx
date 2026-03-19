"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [cursorText, setCursorText] = useState("");

    useEffect(() => {
        // Detect touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = -100;
        let cursorY = -100;

        const onHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a") || target.closest("button") || target.closest(".hover-target")) {
                setCursorText("");
                gsap.to(cursor, { scale: 3, duration: 0.3, backgroundColor: "transparent", border: "1px solid rgba(26,26,26,0.5)" });
            } else if (target.closest(".hover-view")) {
                setCursorText("View");
                gsap.to(cursor, { scale: 4, duration: 0.3, backgroundColor: "rgba(255,255,255,0.8)", border: "none" });
            } else {
                setCursorText("");
                gsap.to(cursor, { scale: 1, duration: 0.3, backgroundColor: "#1A1A1A", border: "none" });
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            onHover(e);
        };

        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            gsap.set(cursor, { x: cursorX, y: cursorY });
        });

        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-foreground pointer-events-none z-[1000] flex items-center justify-center -ml-2 -mt-2 overflow-hidden shadow-sm"
        >
            {cursorText && <span className="text-[4px] text-black font-sans font-bold uppercase tracking-widest">{cursorText}</span>}
        </div>
    );
}
