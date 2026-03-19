import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import NextImage from "next/image";

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projects.find(p => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#EAE8E3] text-[#1A1A1A] flex flex-col pt-32 pb-24 z-10 relative">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex-1">
                <Link href="/#works" className="inline-flex items-center gap-2 font-sans font-bold text-xs tracking-widest text-[#666] hover:text-[#1A1A1A] transition-colors mb-12 uppercase pointer-events-auto">
                    <ArrowLeft size={16} /> Back to Works
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter leading-none mb-6">
                            {project.title}
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-sans font-bold text-[#444] mb-8">
                            {project.subtitle}
                        </h2>
                        <p className="text-xl font-sans leading-relaxed text-[#555] max-w-2xl mb-12">
                            {project.fullDesc}
                        </p>

                        <div className="flex gap-4">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-widest uppercase hover:bg-[#333] transition-colors shadow-xl pointer-events-auto">
                                View GitHub <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#DDD]">
                            <h3 className="font-heading font-black text-2xl mb-6 tracking-tighter uppercase border-b border-[#EEE] pb-4">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techList.map((tech, idx) => (
                                    <span key={idx} className="bg-[#EAE8E3] text-[#1A1A1A] px-4 py-3 rounded-xl font-sans font-bold text-xs tracking-widest uppercase">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto min-h-[400px] bg-[#EAE8E3] rounded-3xl overflow-hidden shadow-2xl mt-16 flex items-center justify-center relative">
                    <NextImage
                        src={`/images/${project.img}`}
                        alt={project.title}
                        fill
                        className="object-contain pointer-events-none"
                        priority
                    />
                </div>

                {/* Additional Gallery Rendering */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="mt-16 sm:mt-24">
                        <h3 className="text-3xl font-heading font-black mb-12 tracking-tighter uppercase text-[#1A1A1A]">Project Gallery</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
                            {project.gallery.map((galleryImg, i) => (
                                <div key={i} className="flex items-center justify-center p-0 rounded-3xl overflow-hidden shadow-xl bg-[#DCD9D4] group relative aspect-video">
                                    <NextImage
                                        src={`/images/${galleryImg}`}
                                        alt={`${project.title} screenshot ${i + 1}`}
                                        fill
                                        className="object-contain pointer-events-none transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}
