"use client";

import Image from "next/image";
import { useState } from "react";

export default function GalleryGrid({ images }: { images: string[] }) {
    const [hoveredImg, setHoveredImg] = useState<string | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative z-10" onMouseLeave={() => setHoveredImg(null)}>
                {images.map((img, idx) => (
                    <div 
                        key={idx} 
                        onMouseEnter={() => setHoveredImg(img)}
                        className="relative w-full overflow-hidden rounded-xl shadow-lg border border-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:-translate-y-2 cursor-crosshair bg-white p-3 lg:p-4 group"
                    >
                        {/* Polarode Style Container */}
                        <div className="relative w-full h-auto overflow-hidden rounded-md bg-[#F5F5F5] aspect-square flex items-center justify-center">
                            <Image 
                                src={img}
                                alt={`Graphic Design ${idx + 1}`}
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                        </div>
                        {/* Subtle numbering or branding */}
                        <div className="mt-4 flex justify-between items-center text-xs font-mono text-[#888] uppercase tracking-widest relative z-20">
                            <span>Artwork / {String(idx + 1).padStart(2, '0')}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black font-semibold">Hovering</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Screen Hover Reveal */}
            <div 
                className={`fixed inset-0 z-[100] pointer-events-none flex items-center justify-center transition-all duration-500 bg-[#0a0a0a]/90 backdrop-blur-sm ${hoveredImg ? 'opacity-100' : 'opacity-0'}`}
            >
                {hoveredImg && (
                    <Image
                        src={hoveredImg}
                        alt="Full Preview"
                        width={2000}
                        height={2000}
                        className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain shadow-2xl scale-95 transform transition-transform duration-500 animate-[popOut_0.3s_ease-out_forwards]"
                        unoptimized
                    />
                )}
                <div className="absolute bottom-12 text-white/50 text-sm tracking-widest uppercase font-mono">
                    Full Preview
                </div>
            </div>
        </>
    );
}
