import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 bg-studio-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-studio-purple to-studio-pink bg-clip-text text-transparent">
            Get in Touch
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-studio-pink" />
              <p className="text-gray-300">+1 (619) 800-4230</p>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-studio-pink" />
              <p className="text-gray-300">1633 Hoover Avenue National City, CA 91950</p>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-studio-pink" />
              <p className="text-gray-300">refugiomusicstudio@gmail.com</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              placeholder="Name"
              className="bg-white/5 border-white/10 text-white"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-white/5 border-white/10 text-white"
              required
            />
            <Textarea
              placeholder="Tell us about your project"
              className="bg-white/5 border-white/10 text-white min-h-[150px]"
              required
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-studio-gold to-studio-pink hover:opacity-90 transition-opacity"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;