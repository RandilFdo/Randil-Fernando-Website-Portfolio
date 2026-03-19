import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function CVPage() {
    return (
        <main className="min-h-screen bg-[#EAE8E3] text-[#1A1A1A] flex flex-col pt-32 pb-12 z-10 relative">
            <div className="max-w-5xl mx-auto w-full px-6 flex flex-col flex-1 h-full">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 font-sans font-bold text-xs tracking-widest text-[#666] hover:text-[#1A1A1A] transition-colors uppercase pointer-events-auto">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>

                    <a href="/cv.pdf" download className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-full font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#333] transition-colors shadow-xl pointer-events-auto">
                        Download PDF <Download size={16} />
                    </a>
                </div>

                <div className="flex-1 w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#DDD] min-h-[1200px] md:min-h-[1600px]">
                    <iframe
                        src="/cv.pdf"
                        className="w-full h-full border-none min-h-[1200px] md:min-h-[1600px]"
                        title="Randil Fernando CV"
                    />
                </div>
            </div>
        </main>
    );
}
