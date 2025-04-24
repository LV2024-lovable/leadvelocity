
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Email notify: handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Email notification function called");

    // Log the available environment variables (without revealing values)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("RESEND_API_KEY exists:", !!resendApiKey);
    console.log("RESEND_API_KEY first 5 chars:", resendApiKey ? resendApiKey.substring(0, 5) : "not set");
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ error: 'Resend API key not configured' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }
    
    if (!resendApiKey.startsWith("re_")) {
      console.error("RESEND_API_KEY does not appear to be in the correct format. Should start with 're_'");
      return new Response(
        JSON.stringify({ error: 'Resend API key appears to be invalid. It should start with "re_"' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }
    
    console.log("RESEND_API_KEY is set, initializing Resend client");
    
    const resend = new Resend(resendApiKey);
    
    const requestBody = await req.json();
    console.log("Request body:", JSON.stringify(requestBody));
    
    const { name, company, email, phone, message } = requestBody;

    // Check if required data is present
    if (!name || !email || !message) {
      console.error("Missing required fields in request");
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log("Preparing to send email with Resend");
    console.log("Sending from: LeadVelocity <info@leadvelocity.nl>");
    console.log("Sending to: info@leadvelocity.nl");

    try {
      const emailResult = await resend.emails.send({
        from: "LeadVelocity <info@leadvelocity.nl>",
        to: ["info@leadvelocity.nl"],
        subject: "New Contact Form Submission",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1d4ed8;">New Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });

      console.log("Resend API response:", JSON.stringify(emailResult));

      if (emailResult.error) {
        console.error("Resend API error:", emailResult.error);
        return new Response(
          JSON.stringify({ error: 'Failed to send email', details: emailResult.error }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        );
      }

      console.log("Email sent successfully:", emailResult.data);
      
      return new Response(JSON.stringify({ success: true, data: emailResult.data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (resendError) {
      console.error("Error when calling Resend API:", resendError);
      return new Response(
        JSON.stringify({ error: 'Resend API error', details: resendError.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error('Error in email-notify function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email notification', details: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
