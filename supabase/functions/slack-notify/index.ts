
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Slack notify: handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Slack notification function called");
    
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

    const webhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    if (!webhookUrl) {
      console.error("SLACK_WEBHOOK_URL environment variable is not set");
      return new Response(
        JSON.stringify({ error: 'Slack webhook URL not configured' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    console.log("Preparing Slack message");
    console.log("Will send to webhook URL:", webhookUrl.substring(0, 20) + "...");
    
    const slackMessage = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📬 New Contact Form Submission",
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${name}`
            },
            {
              type: "mrkdwn",
              text: `*Company:*\n${company || 'Not provided'}`
            }
          ]
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`
            },
            {
              type: "mrkdwn",
              text: `*Phone:*\n${phone || 'Not provided'}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message:*\n${message}`
          }
        }
      ]
    };

    console.log("Sending to Slack webhook");
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackMessage),
      });

      console.log("Slack API response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to send Slack notification. Status: ${response.status}. Response: ${errorText}`);
        throw new Error(`Slack API returned ${response.status}: ${errorText}`);
      }

      console.log("Slack notification sent successfully");
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (fetchError) {
      console.error("Fetch error when calling Slack API:", fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('Error in slack-notify function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send notification', details: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
