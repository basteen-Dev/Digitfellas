'use client'

import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CheckCircle2 } from 'lucide-react'

export function AboutSection() {
    const principles = [
        "Senior-led engineering and decision-making",
        "Architecture-first thinking with governance in mind",
        "Clear communication across technical and business stakeholders"
    ]

    return (
        <section className="relative w-full bg-background py-24 transition-colors duration-300">
            <div className="container max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Column: Text Content */}
                    <div className="w-full lg:w-1/2">
                        <ScrollReveal variant="fade-right">
                            {/* Section Title removed as requested */}
                            <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-8 text-center lg:text-left">
                                Experience Shapes <br /> Our Approach
                            </h3>

                            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed mb-10">
                                <p>
                                    With over 20 years in the software industry, we’ve worked across technologies, platforms, and business cycles. We’ve seen what scales, what breaks, and what quietly becomes expensive over time.
                                </p>
                                <p>
                                    That experience informs how we work today — prioritizing clarity over complexity, structure over shortcuts, and systems that remain dependable long after launch.
                                </p>
                            </div>

                            <hr className="border-border mb-10" />

                            <h4 className="text-2xl font-bold text-foreground mb-6">Key Principles</h4>
                            <ul className="space-y-4">
                                {principles.map((principle, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <span className="text-muted-foreground text-lg">{principle}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>
                    </div>

                    {/* Right Column: Visual/Stats or clean aesthetic */}
                    <div className="w-full lg:w-1/2 relative min-h-[500px] flex items-center justify-center">
                        <ScrollReveal variant="fade-left" className="relative w-full h-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/10 rounded-[3rem] blur-3xl" />
                            <div className="relative z-10 p-1 bg-card border border-border rounded-3xl shadow-2xl overflow-hidden aspect-square flex flex-col items-center justify-center text-center p-12">
                                <div className="text-[120px] font-bold text-foreground leading-none mb-2">20+</div>
                                <div className="text-2xl text-muted-foreground font-medium">Years of Experience</div>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    )
}
