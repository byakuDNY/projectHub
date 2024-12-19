import CTA from "@/features/home/landing/components/cta";
import FAQ from "@/features/home/landing/components/faq";
import Features from "@/features/home/landing/components/features";
import Hero from "@/features/home/landing/components/hero";
import Pricing from "@/features/home/landing/components/pricing";
import Testimonials from "@/features/home/landing/components/testimonials";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;
