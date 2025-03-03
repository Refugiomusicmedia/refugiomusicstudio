
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

      if (supabaseError) {
        console.error("Supabase Error:", supabaseError);
        throw new Error(supabaseError.message);
      }

      toast({
        title: "Project details saved!",
        description: "Now sending notification to Refugio Music Studio...",
        duration: 3000,
      });

      // Send email notification to the company only
      const response = await supabase.functions.invoke(
        "send-project-email",
        {
          body: formData,
        }
      );
      
      // Check for function errors
      if (response.error) {
        console.error("Email Function Error:", response.error);
        throw new Error(response.error.message || "Error sending notification");
      }
      
      // Check response data for API errors
      const data = response.data;
      if (data && data.error) {
        console.error("Email API Error:", data.error);
        throw new Error(data.error);
      }

      toast({
        title: "Success!",
        description: "Your project details have been submitted successfully.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        projectDetails: "",
      });
    } catch (error: any) {
      console.error("Error:", error);
      
      toast({
        title: "Error",
        description: error.message || "There was an error sending your message. Please try again.",
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
            
            <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-studio-gold mb-4">How It Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Fill out the form with your project details</li>
                <li>Your information is securely stored in our database</li>
                <li>Our team will review your project and contact you soon</li>
              </ol>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectDetails" className="text-white">Project Details</Label>
              <Textarea
                id="projectDetails"
                name="projectDetails"
                placeholder="Tell us about your project"
                value={formData.projectDetails}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white min-h-[150px]"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-studio-gold to-studio-pink hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              By submitting this form, your details will be stored in our database 
              and a notification will be sent to our team.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
