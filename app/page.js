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
        <TechStackSection />
      </main>
    </>
  )
}
