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
import { generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/schemaMarkup";

const Index = () => {
  const baseUrl = "https://pod21.xyz";
  
  const organizationSchema = generateOrganizationSchema(baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: "Home", url: "/" }],
    baseUrl
  );

  const schemaMarkup = [organizationSchema, breadcrumbSchema];

  return (
    <div className="min-h-screen bg-podcast-black text-white">
      <SEO
        title="pod21 - Professional Podcast Production Services"
        description="Professional podcast production services including editing, hosting, promotion and more. Take your podcast to the next level with pod21."
        image="/og-image.png"
        imageAlt="pod21 - Professional Podcast Production"
        type="website"
        keywords="podcast production, podcast editing, podcast hosting, podcast promotion, professional podcast services"
        schemaMarkup={schemaMarkup}
      />
      <Navbar />
      <Hero />
      <Platform />
      <WhyPodcast />
      <WhyUs />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
