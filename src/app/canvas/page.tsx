import fs from "fs";
import path from "path";
import GalleryGrid from "@/components/GalleryGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CanvasPage() {
    // Read the public directory to find files starting with "design"
    const publicDir = path.join(process.cwd(), "public");
    const imagesDir = path.join(process.cwd(), "public/images");
    
    let designFiles: string[] = [];
    
    try {
        let pFiles: string[] = [];
        if (fs.existsSync(publicDir)) {
            pFiles = fs.readdirSync(publicDir)
                .filter(file => file.startsWith("design") && file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
                .map(file => `/${file}`);
        }
        
        let iFiles: string[] = [];
        if (fs.existsSync(imagesDir)) {
            iFiles = fs.readdirSync(imagesDir)
                .filter(file => file.startsWith("design") && file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
                .map(file => `/images/${file}`);
        }
        
        designFiles = [...pFiles, ...iFiles];
    } catch(e) {
        console.error(e);
    }
    
    return (
        <main className="min-h-screen bg-[#111111] text-[#EAE8E3]">
            <Navbar />
            <div className="pt-48 pb-24 px-6 md:px-12 w-full max-w-7xl mx-auto min-h-[80vh]">
                <header className="mb-24 flex flex-col gap-6">
                    <h1 className="text-6xl md:text-9xl font-heading font-black tracking-tighter uppercase leading-none text-[#EAE8E3]">
                        The Canvas
                    </h1>
                    <p className="font-sans text-xl md:text-3xl text-[#999] max-w-2xl font-medium">
                        A curated collection of my experiments in graphic design, visual identity, and digital artistry. 
                    </p>
                </header>
                
                {designFiles.length > 0 ? (
                    <GalleryGrid images={designFiles} />
                ) : (
                    <div className="w-full py-32 flex flex-col items-center justify-center border-t border-b border-[#333] text-[#888]">
                        <p className="font-sans text-xl">No designs found. Drop files starting with &apos;design&apos; into the /public/images folder!</p>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
