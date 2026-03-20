"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const pipelineLogs = [
    "[Jenkins] Started by user Randil Fernando",
    "[Jenkins] Building in workspace /var/jenkins_home/workspace/portfolio-deploy",
    "Checking out Git repository...",
    "Fetching upstream changes from https://github.com/randilfernando/portfolio.git",
    "Commit identified: 8f4a1b (main)",
    "Starting Docker build...",
    "Successfully built image randilfernando/portfolio:latest",
    "Pushing image to Docker Hub...",
    "Applying Kubernetes manifests...",
    "Deployment rollout status: 3/3 ready",
    "Running post-deployment health checks...",
    "Health check passed: HTTP 200 OK",
    "Pipeline run completed successfully. Status: SUCCESS"
];

export default function DevOpsTerminal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const hasTriggered = useRef(false);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            onEnter: () => {
                if (!hasTriggered.current) {
                    hasTriggered.current = true;
                    // Simulate typing
                    let currentIndex = 0;
                    const interval = setInterval(() => {
                        if (currentIndex < pipelineLogs.length) {
                            setLogs(prev => [...prev, pipelineLogs[currentIndex]]);
                            currentIndex++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 400);
                }
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="w-full bg-white border border-[#DDD] rounded-xl overflow-hidden shadow-2xl hover-target pointer-events-auto transition-transform duration-700 hover:scale-[1.02]">
            {/* Terminal Header */}
            <div className="bg-[#F5F5F5] px-4 py-3 flex items-center gap-2 border-b border-[#DDD]">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="text-xs text-[#888] font-mono ml-4">jenkins@production:~</div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm md:text-base h-[350px] overflow-y-auto bg-white text-[#333] text-left">
                {logs.map((log, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${index === pipelineLogs.length - 1 ? "text-green-600 font-bold" : "text-[#555]"}`}
                    >
                        <span className="text-[#999] mr-2">$</span>
                        {log}
                    </div>
                ))}
                {logs.length < pipelineLogs.length && hasTriggered.current && (
                    <div className="animate-pulse w-2 h-5 bg-black mt-1 inline-block align-middle"></div>
                )}
                {!hasTriggered.current && (
                    <div className="text-[#888]">Awaiting pipeline trigger...</div>
                )}
            </div>
        </div>
    );
}
