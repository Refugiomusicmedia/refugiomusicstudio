
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProjectEmailRequest {
  name: string;
  email: string;
  projectDetails: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting email sending process...");

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured in environment variables");
    }

    // Validate API key format (basic check)
    if (!RESEND_API_KEY.startsWith('re_')) {
      console.error("Invalid Resend API key format - should start with 're_'");
      throw new Error("Invalid Resend API key format");
    }

    const requestData = await req.json();
    const { name, email, projectDetails }: ProjectEmailRequest = requestData;
    
    console.log("Received project email request:", { name, email });

    if (!name || !email || !projectDetails) {
      throw new Error("Missing required fields: name, email, or projectDetails");
    }

    // Create an email to the studio only
    const studioEmailData = {
      from: "Contact Form <onboarding@resend.dev>", // Using Resend's test sender
      to: ["refugiomusicstudio@gmail.com"],
      subject: `New Project Inquiry from ${name}`,
      html: `
        <h2>New Project Inquiry from ${name}</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Project Details:</strong></p>
        <blockquote style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #333;">
          ${projectDetails}
        </blockquote>
      `,
    };

    console.log("Attempting to send notification email to studio");
    
    // Send the email to the studio
    const studioRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(studioEmailData),
    });

    const studioResponseData = await studioRes.json();
    console.log("Studio email response:", studioResponseData);

    // Check if studio email sent successfully
    if (!studioRes.ok) {
      console.error("Resend API error:", studioResponseData);
      return new Response(
        JSON.stringify({ 
          error: studioResponseData.message || "Failed to send email",
          details: `Error: ${studioResponseData.message || "Unknown error"}. Status: ${studioRes.status}`
        }),
        {
          status: studioRes.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        studioEmailId: studioResponseData.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in send-project-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send email",
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
