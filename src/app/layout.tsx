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
    description: "Official portfolio of Randil Fernando, a Full-Stack Developer & DevOps Engineer. Explore my projects, tech stack, and robotics experience.",
    icons: {
        icon: "/icon.png",
        apple: "/icon.png",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Randil Fernando",
    url: "https://randilfdo.com",
    jobTitle: "Full-Stack Engineer & Robotics Lead",
    sameAs: [
        "https://linkedin.com/in/randil-fernando-in/",
        "https://github.com/RandilFdo"
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
