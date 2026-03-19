import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-heading" });

export const metadata: Metadata = {
    title: "Randil Fernando | Full-Stack Developer",
    description: "Official portfolio of Randil Fernando, a Full-Stack Developer & DevOps Engineer and former Software Engineering Intern at WSO2. Explore my projects, tech stack, and robotics experience.",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Randil Fernando",
    url: "https://randilfernando.com",
    jobTitle: "Full-Stack Developer & DevOps Engineer",
    worksFor: {
        "@type": "Organization",
        name: "WSO2"
    },
    sameAs: [
        "https://github.com/randilfernando",
        "https://linkedin.com/in/randilfernando"
    ]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background text-foreground antialiased`}>
                <Cursor />
                <Preloader />
                <Navbar />
                <LenisProvider>
                    {children}
                </LenisProvider>
            </body>
        </html>
    );
}
