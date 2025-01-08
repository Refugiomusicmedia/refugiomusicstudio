import { Music, Mic2, Waves } from "lucide-react";

const services = [
  {
    icon: Music,
    title: "Music Production",
    description: "Professional music production services with state-of-the-art equipment and experienced producers."
  },
  {
    icon: Mic2,
    title: "Recording",
    description: "High-quality recording services in our professionally treated studio space."
  },
  {
    icon: Waves,
    title: "Mixing & Mastering",
    description: "Expert mixing and mastering to give your music the professional polish it deserves."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-studio-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-studio-copper to-studio-gold bg-clip-text text-transparent">
            Our Services
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <service.icon className="w-12 h-12 text-studio-gold mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;