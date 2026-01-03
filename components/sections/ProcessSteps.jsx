'use client'

import { useProcessSteps } from '@/lib/homepage-hooks'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ProcessStepsSection() {
    const { data: steps = [], isLoading } = useProcessSteps()

    if (isLoading || steps.length === 0) return null

    return (
        <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <ScrollReveal variant="fade-up" className="text-center mb-16">
                    <h2 className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-4">
                        Work Process
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Discover What We Do <br /> And How We Do It
                    </h3>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Our streamlined process ensures transparency and quality at every step of the development lifecycle.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <ScrollReveal
                            key={step.id}
                            variant="fade-up"
                            delay={index * 150}
                            className="h-full"
                        >
                            <div className="group h-full p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-purple-500/30 hover:bg-[#1a1a1a] transition-all duration-500 relative overflow-hidden text-left">
                                {/* Subtle Gradient Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-4 text-white font-heading group-hover:text-purple-400 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
