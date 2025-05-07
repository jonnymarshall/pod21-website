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

const Index = () => {
  return (
    <div className="min-h-screen bg-podcast-black text-white">
      <SEO />
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
