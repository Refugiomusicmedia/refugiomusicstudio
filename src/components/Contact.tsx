import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("Project Feedback")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            project_details: formData.projectDetails,
          },
        ]);

      if (supabaseError) throw supabaseError;

      // Send email
      const { error: emailError } = await supabase.functions.invoke(
        "send-project-email",
        {
          body: formData,
        }
      );

      if (emailError) throw emailError;

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        projectDetails: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <p className="text-gray-300">
                1633 Hoover Avenue National City, CA 91950
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-studio-pink" />
              <p className="text-gray-300">refugiomusicstudio@gmail.com</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white"
              required
            />
            <Textarea
              name="projectDetails"
              placeholder="Tell us about your project"
              value={formData.projectDetails}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white min-h-[150px]"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-studio-gold to-studio-pink hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;