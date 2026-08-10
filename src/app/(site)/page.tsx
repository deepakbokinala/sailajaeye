import { Footer, Header } from "@/components/layout";
import {
  Blogs,
  BrandSlider,
  CareStats,
  Doctors,
  Hero,
  Intro,
  LeaderQuote,
  QuickActions,
  Specialties,
  Testimonials,
} from "@/components/sections";
import { getTestimonials, getDoctors } from "@/lib/content/outstatic";

export default function Home() {
  const testimonials = getTestimonials();
  const doctors = getDoctors();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickActions />
        <LeaderQuote />
        <Intro />
        <CareStats />
        <Specialties />
        <Doctors items={doctors} />
        <Testimonials items={testimonials} />
        <Blogs />
        <BrandSlider />
      </main>
      <Footer />
    </>
  );
}
