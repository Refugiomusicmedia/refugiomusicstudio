import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Listen from "@/components/Listen";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-studio-dark text-white">
      <Navbar />
      <Hero />
      <Services />
      <Listen />
      <Contact />
    </div>
  );
};

export default Index;