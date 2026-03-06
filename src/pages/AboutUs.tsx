import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Platform from "@/components/Platform";
import WhyPodcast from "@/components/WhyPodcast";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import AboutHistory from "@/components/AboutHistory";
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schemaMarkup";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const baseUrl = "https://pod21.xyz";
  
  const organizationSchema = generateOrganizationSchema(baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" }
    ],
    baseUrl
  );

  const schemaMarkup = [organizationSchema, breadcrumbSchema];

  return (
    <div className="min-h-screen bg-podcast-black text-white">
      <SEO
        title="About pod21 - Professional Podcast Production"
        description="Learn about pod21's mission to provide professional podcast production services. We help podcasters take their shows to the next level with editing, hosting, and promotion."
        image="/about_pod21.png"
        imageAlt="About pod21"
        type="website"
        keywords="about pod21, podcast production company, podcast services, podcast editing company"
        canonicalUrl={`${baseUrl}/about`}
        schemaMarkup={schemaMarkup}
      />
      <Navbar />
      <AboutHero />
      <AboutHistory />
      <Contact />
      <Footer />
    </div>
  );
};

export default AboutUs;
