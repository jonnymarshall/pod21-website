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

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-podcast-black text-white">
      <SEO />
      <Navbar />
      <AboutHero />
      <AboutHistory />
      <Contact />
      <Footer />
    </div>
  );
};

export default AboutUs;
