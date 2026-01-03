'use client'

import Link from 'next/link'
import Image from 'next/image'

const navigation = {
    main: [
        { name: 'About', href: '/about' },
        { name: 'Capabilities', href: '/services' },
        { name: 'How We Work', href: '/how-we-work' },
        { name: 'Case Studies', href: '/projects' },
        { name: 'Insights', href: '/blog' },
        { name: 'Partnerships', href: '#partnerships' }, // Anchor or page depending on setup. Assuming anchor or section link for now based on page flow. Or maybe just text if no page exists? "Partnerships" isn't a route yet. I'll point to home hash or creating a route? User said "Platforms & Partnerships" section exists. I'll make it a hash link or just /#partnerships
        { name: 'Contact', href: '/contact' },
    ]
}

export function SiteFooter() {
    return (
        <footer className="bg-background text-foreground border-t border-border pt-24 pb-12 transition-colors duration-300">
            <div className="container max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

                    {/* Brand & Statement */}
                    <div className="md:col-span-5">
                        <Link href="/" className="inline-block mb-8">
                            <Image
                                src="/images/digitfellas_logo.png"
                                alt="DigitFellas"
                                width={180}
                                height={40}
                                className="h-[40px] w-auto object-contain dark:invert-0 invert"
                                priority
                            />
                        </Link>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                            Digit Fellas is a software engineering firm focused on building reliable digital systems for long-term business value.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-7 flex flex-col md:items-end">
                        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-4 text-left md:text-right">
                            {navigation.main.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-bold uppercase tracking-wide"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
                    <p>© Digit Fellas. Software Engineering.</p>
                </div>

            </div>
        </footer>
    )
}
