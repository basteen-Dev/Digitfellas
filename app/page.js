import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { HeroSection } from '@/components/sections/HeroSection'
import { SponsorsSection } from '@/components/sections/SponsorsSection'
import { ProfessionalServices } from '@/components/sections/ProfessionalServices'
import { MainServicesProjects } from '@/components/sections/MainServicesProjects'
import { AboutSection } from '@/components/sections/AboutSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ServicesPromo } from '@/components/sections/ServicesPromo'
import { BannerPromo } from '@/components/sections/BannerPromo'
import { ProcessStepsSection } from '@/components/sections/ProcessSteps'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { TechStackSection } from '@/components/sections/TechStack'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { getHomeData } from '@/lib/data'

export const revalidate = 60

export default async function Home() {
  const { hero, services, projects, posts } = await getHomeData()

  // Log for verification (build time)
  console.log('Homepage Data Loaded via DB:', {
    hero: !!hero?.title,
    services: services?.length,
    projects: projects?.length,
    posts: posts?.length
  })

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection hero={hero} />
        <SponsorsSection />
        <ProfessionalServices />
        <MainServicesProjects services={services} projects={projects} />
        <AboutSection />
        <BlogSection posts={posts} />
        <ServicesPromo services={services} />
        <BannerPromo />
        <ProcessStepsSection />
        <TestimonialsSection />

        {/* New CTA Section */}
        <section className="py-24 bg-[#0F0F0F] text-white text-center">
          <div className="container px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to transform your business?</h2>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-xl">
              <Link href="/contact">
                Let's Work Together <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <TechStackSection />
      </main>
    </>
  )
}
