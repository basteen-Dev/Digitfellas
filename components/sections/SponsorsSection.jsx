'use client'

import Image from 'next/image'
import { useClientLogos } from '@/lib/homepage-hooks'

export function SponsorsSection() {
    const { data: logos = [], isLoading } = useClientLogos()

    if (isLoading) return null
    if (!logos.length) return null

    // Duplicate logos for seamless loop
    const duplicatedLogos = [...logos, ...logos]

    return (
        <section className="relative w-full overflow-hidden bg-background py-16 border-t border-border transition-colors duration-300">
            <div className="relative">
                {/* Fade overlays on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Marquee container */}
                <div className="flex animate-marquee hover:pause-marquee">
                    {duplicatedLogos.map((logo, index) => (
                        <div
                            key={`${logo.id}-${index}`}
                            className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center"
                        >
                            <div className="relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 dark:invert-0 invert">
                                <Image
                                    src={logo.logo_url}
                                    alt={logo.name}
                                    width={140}
                                    height={60}
                                    className="max-w-[120px] md:max-w-[140px] h-auto object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }

                .pause-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    )
}
