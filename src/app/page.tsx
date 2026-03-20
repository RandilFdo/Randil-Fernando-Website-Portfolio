import Hero from "@/components/Hero";
import About from "@/components/About";
import HorizontalScroll from "@/components/HorizontalScroll";
import Neurobloom from "@/components/Neurobloom";
import Services from "@/components/Services";
import BentoGrid from "@/components/BentoGrid";
import GalleryPreview from "@/components/GalleryPreview";
import BeyondTheScreen from "@/components/BeyondTheScreen";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Hero />     {/* Light */}
            <About />    {/* Dark */}
            <HorizontalScroll /> {/* Light */}
            <Neurobloom /> {/* Dark */}
            <Services />   {/* Light */}
            <BentoGrid />  {/* Light */}
            
            <GalleryPreview /> {/* Dark/Arts */}
            
            <BeyondTheScreen /> {/* Light */}
            <Footer />     {/* Dark */}
        </main>
    );
}
