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
        title="Podcast Production Services for B2B Creators - pod21"
        description="Professional podcast production services for businesses. We handle editing, hosting, promotion, and distribution. Launch your brand podcast today."
        image="/og-image.png"
        imageAlt="pod21 - Professional Podcast Production Services"
        type="website"
        keywords="podcast production services, B2B podcast production, professional podcast editing, podcast hosting for business, podcast promotion agency"
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
