'use client'

import React, { useState, useEffect } from 'react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function PartnershipsSection() {
    const partners = [
        { name: 'Shopify', label: 'Partner' },
        { name: 'Salesforce', label: 'Partner' },
        { name: 'AWS', label: 'Cloud' }
    ]

    const [currentIndex, setCurrentIndex] = useState(1) // Start with middle logo

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % partners.length)
        }, 3000) // Rotate every 3 seconds

        return () => clearInterval(interval)
    }, [partners.length])

    const getLogoPosition = (index) => {
        const diff = (index - currentIndex + partners.length) % partners.length

        if (diff === 0) return 'center' // Current/center logo
        if (diff === 1 || diff === -(partners.length - 1)) return 'right' // Next logo (coming from right)
        return 'left' // Previous logo (going to left)
    }

    return (
        <section className="relative w-full bg-background py-24 border-t border-border overflow-hidden transition-colors duration-300">
            <div className="container max-w-7xl mx-auto px-6">

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">

                    {/* Header & Content */}
                    <div className="max-w-xl">
                        <ScrollReveal variant="fade-right">
                            <h3 className="text-3xl font-bold text-foreground leading-tight font-heading mb-6">
                                Platforms & Partnerships
                            </h3>
                            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-6">
                                We work within established technology ecosystems and follow platform best practices to ensure reliability, compliance, and long-term viability.
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Modern Web, Cloud, and Automation Technologies
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Rotating Logos with Fade Animation */}
                    <div className="relative w-full md:w-auto h-20 flex items-center justify-center md:justify-end">
                        <div className="relative w-64 h-full">
                            {partners.map((partner, index) => {
                                const position = getLogoPosition(index)

                                return (
                                    <div
                                        key={partner.name}
                                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${position === 'center'
                                            ? 'opacity-100 translate-x-0 scale-100 z-10'
                                            : position === 'right'
                                                ? 'opacity-0 translate-x-12 scale-90 z-0'
                                                : 'opacity-0 -translate-x-12 scale-90 z-0'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`text-2xl font-bold text-foreground tracking-tight ${partner.name === 'Salesforce' ? 'italic' : ''
                                                }`}>
                                                {partner.name.toLowerCase()}
                                            </span>
                                            <span className="text-xs font-mono text-muted-foreground uppercase border border-border rounded px-2 py-1">
                                                {partner.label}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
