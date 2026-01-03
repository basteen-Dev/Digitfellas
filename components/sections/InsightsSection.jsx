'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function InsightsSection({ posts = [] }) {
    // Only show 4 posts or less
    const displayPosts = posts.slice(0, 4)

    return (
        <section className="relative w-full bg-background py-24 md:py-32 border-t border-border transition-colors duration-300">
            <div className="container max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <ScrollReveal variant="fade-right" className="max-w-2xl">
                        {/* Swapped Hierarchy to match other new sections */}
                        <h3 className="text-3xl md:text-5xl font-bold text-foreground leading-tight font-heading mb-6">
                            Insights & Perspectives
                        </h3>
                        <p className="text-muted-foreground text-lg font-body leading-relaxed max-w-2xl">
                            Observations from building, auditing, and scaling digital systems.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-left" delay={200} className="hidden md:block">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-foreground font-bold hover:text-muted-foreground transition-colors group border-b border-foreground pb-1"
                        >
                            Explore insights
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </ScrollReveal>
                </div>

                {/* Corporate Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {displayPosts.map((post, index) => (
                        <ScrollReveal
                            key={post.id || index}
                            variant="fade-up"
                            delay={index * 100}
                            className="group h-full flex flex-col justify-between border-t border-border pt-8 hover:border-foreground/40 transition-colors cursor-pointer"
                        >
                            <Link href={`/blog/${post.slug}`} className="block h-full">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">
                                            {post.category || 'Perspective'}
                                        </span>
                                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>

                                    <h4 className="text-2xl font-bold text-foreground leading-tight mb-4 group-hover:underline decoration-1 decoration-muted-foreground underline-offset-4">
                                        {post.title}
                                    </h4>

                                    <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
                                        {post.excerpt || "Read more about our perspective on this topic..."}
                                    </p>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Mobile Bottom CTA */}
                <div className="mt-16 md:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-foreground font-bold hover:text-muted-foreground transition-colors group border-b border-foreground pb-1"
                    >
                        Explore insights
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
