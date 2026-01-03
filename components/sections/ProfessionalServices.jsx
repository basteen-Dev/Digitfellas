'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ProfessionalServices({ services = [] }) {
    return (
        <section className="relative w-full bg-background pt-0 pb-24 transition-colors duration-300">
            <div className="container max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <ScrollReveal variant="fade-up">
                        <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                            What We Build and Support
                        </h3>
                        <p className="text-xl text-muted-foreground leading-relaxed mx-auto max-w-2xl">
                            We focus on engineering outcomes, not surface-level deliverables. Our capabilities span product engineering, enterprise platforms, AI-driven automation, and security assurance.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Capability Cards Grid 
                    Mobile: grid-cols-2 (Two cards)
                    Desktop: lg:grid-cols-4 (Single row for 4 items)
                */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <ScrollReveal
                            key={service.id || index}
                            variant="fade-up"
                            delay={index * 100}
                            className="h-full"
                        >
                            <div className="group h-full p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-500 relative overflow-hidden text-left shadow-sm">
                                {/* Subtle Gradient Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/5 transition-all duration-500" />

                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground transition-colors">
                                        {service.description}
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
