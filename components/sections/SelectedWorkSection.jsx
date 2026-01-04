'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function SelectedWorkSection() {
    const cases = [
        {
            title: "Commerce Platform Modernization",
            category: "Retail / E-commerce",
            description: "Re-architected an e-commerce platform to support international scale while improving performance and operational stability."
        },
        {
            title: "Workflow Automation for Operations Teams",
            category: "Operations / SaaS",
            description: "Designed intelligent automation to reduce manual processes and improve reliability across critical workflows."
        },
        {
            title: "Enterprise System Audit & Hardening",
            category: "Security / FinTech",
            description: "Conducted a comprehensive software audit to identify architectural risks, security gaps, and long-term scalability issues."
        }
    ]

    return (
        <section className="relative w-full bg-background py-24 md:py-32 transition-colors duration-300">
            <div className="container max-w-7xl mx-auto px-6">

                {/* Header (Aligned Left for Corporate feel) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <ScrollReveal variant="fade-right" className="max-w-2xl">
                        {/* Swapped Hierarchy to match other sections */}
                        <h3 className="text-3xl md:text-3xl font-bold text-foreground leading-tight font-heading mb-6">
                            Selected Work
                        </h3>
                        <p className="text-muted-foreground text-lg font-body leading-relaxed max-w-2xl">
                            A snapshot of how we approach real-world engineering challenges.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-left" delay={200} className="hidden md:block">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-foreground font-bold hover:text-muted-foreground transition-colors group border-b border-foreground pb-1"
                        >
                            View case studies
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Case Study List (Corporate / Structured) */}
                <div className="border-t border-border">
                    {cases.map((item, index) => (
                        <ScrollReveal
                            key={index}
                            variant="fade-up"
                            delay={index * 100}
                            className="group"
                        >
                            <Link href="/projects" className="block">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-border group-hover:bg-accent transition-colors px-4 -mx-4 rounded-lg">

                                    {/* Column 1: Number & Category (Meta) */}
                                    <div className="md:col-span-3 flex flex-col justify-between">
                                        <span className="text-muted-foreground font-mono text-sm mb-2">0{index + 1}</span>
                                        <span className="text-primary text-sm uppercase tracking-wider font-bold">{item.category}</span>
                                    </div>

                                    {/* Column 2: Title & Arrow */}
                                    <div className="md:col-span-5 relative">
                                        <h4 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-foreground/80 transition-colors pr-10">
                                            {item.title}
                                        </h4>
                                    </div>

                                    {/* Column 3: Description */}
                                    <div className="md:col-span-4 flex items-center">
                                        <p className="text-muted-foreground leading-relaxed text-base">
                                            {item.description}
                                        </p>
                                        <ArrowUpRight className="w-6 h-6 text-foreground ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Mobile Bottom CTA */}
                <div className="mt-12 md:hidden">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-foreground font-bold hover:text-muted-foreground transition-colors group border-b border-foreground pb-1"
                    >
                        View case studies
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
