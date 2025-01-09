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
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, projectDetails }: ProjectEmailRequest = await req.json();
    
    console.log("Received project email request:", { name, email });

    const emailData = {
      from: "onboarding@resend.dev", // Using Resend's test sender
      to: ["refugiomusicstudio@gmail.com"],
      subject: `New Project Inquiry from ${name}`,
      html: `
        <h2>New Project Inquiry from ${name}</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Project Details:</strong></p>
        <p>${projectDetails}</p>
      `,
    };

    console.log("Sending email with data:", emailData);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await res.json();
    console.log("Resend API response:", responseData);

    if (!res.ok) {
      console.error("Resend API error:", responseData);
      return new Response(
        JSON.stringify({ 
          error: responseData.message || "Failed to send email",
          details: `Error: ${responseData.message || "Unknown error"}`
        }),
        {
          status: res.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
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