'use client'

import { Laptop, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ServicesPromo({ services = [] }) {
    // Take the first 3 services to display
    const promoServices = services.slice(0, 3)

    return (
        <section className="relative w-full bg-background text-foreground pt-[95px] pb-[160px] md:pt-[90px] md:pb-[90px] overflow-hidden transition-colors duration-300">
            {/* Background Image Optimization - Using native img for SVG background to avoid null response errors */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-40 opacity-5">
                <img
                    src="/images/hero-bg.svg"
                    alt=""
                    className="w-full h-full object-cover opacity-60 dark:invert-0 invert"
                />
                <div className="absolute inset-0 bg-background/60" />
            </div>

            <div className="container relative z-10 max-w-[1248px] mx-auto px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {promoServices.map((service, index) => (
                        <ScrollReveal
                            key={service.id}
                            variant="fade-up"
                            delay={index * 200}
                            className="bg-card p-[48px] rounded-[5px] transform transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 hover:bg-secondary shadow-lg border border-border group flex flex-col"
                        >
                            {/* Number */}
                            <span className="text-foreground text-5xl font-bold font-heading mb-6 block opacity-50 group-hover:opacity-100 transition-opacity">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* Icon */}
                            <div className="w-[82px] h-[82px] rounded-[15%] bg-secondary flex items-center justify-center mb-8 group-hover:bg-foreground transition-colors duration-300 overflow-hidden relative">
                                {service.icon_url ? (
                                    <div className="relative w-10 h-10 group-hover:grayscale group-hover:invert transition-all">
                                        <Image
                                            src={service.icon_url}
                                            alt=""
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ) : (
                                    <Laptop className="w-10 h-10 text-foreground group-hover:text-background transition-colors" />
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-foreground transition-colors">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground text-[15px] leading-[26px] mb-8 flex-grow">
                                {(service.short_description || service.description || "No description available.").slice(0, 120) + ((service.short_description || service.description || "").length > 120 ? '...' : '')}
                            </p>

                            {/* Button */}
                            <Link
                                href={`/services/${service.slug}`}
                                className="inline-flex items-center text-foreground font-bold text-sm tracking-wide bg-secondary px-6 py-3 rounded-b-[12px] rounded-t-[4px] self-start group-hover:bg-foreground group-hover:text-background transition-all"
                            >
                                View details
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </ScrollReveal>
                    ))}

                    {promoServices.length === 0 && (
                        <div className="col-span-3 text-center text-muted-foreground">
                            No services available to display.
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
