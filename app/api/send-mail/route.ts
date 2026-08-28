import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const yourEmail = process.env.YOUR_EMAIL;
const bccEmail = 'kristine.miguel@cravingsgroup.com';

// Webhook configuration - Using environment variable for flexibility
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://cca-manila.techops.ph/web/hook/1e003c42-865f-482a-8faa-88c49c366e64';

// Log environment check (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Resend API Key exists:', !!resendApiKey);
  console.log('Your email exists:', !!yourEmail);
  console.log('BCC email:', bccEmail);
  console.log('Webhook URL configured:', !!WEBHOOK_URL);
}

if (!resendApiKey) {
  console.error('RESEND_API_KEY is missing from environment variables');
}

if (!yourEmail) {
  console.error('YOUR_EMAIL is missing from environment variables');
}

if (!WEBHOOK_URL) {
  console.error('WEBHOOK_URL is missing from environment variables');
}

const resend = new Resend(resendApiKey);

// Enhanced webhook function with retry logic and timeout
async function sendToWebhook(payload: any, retries: number = 3, timeout: number = 5000) {
  if (!WEBHOOK_URL) {
    console.error('Webhook URL is not configured');
    return { success: false, error: 'Webhook URL not configured' };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Submission-ID': payload.unique_id,
          'X-Tracking-ID': payload.tracking_id,
          // Add authentication if needed
          'Authorization': `Bearer ${process.env.WEBHOOK_API_KEY || ''}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log(`Webhook sent successfully on attempt ${attempt}`);
      return { success: true, data, status: response.status };
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      // Don't log abort errors as failures if it's the last attempt
      if (error.name === 'AbortError' && attempt === retries) {
        console.error(`Webhook timed out after ${timeout}ms`);
        return { success: false, error: 'Webhook request timed out' };
      }

      console.error(`Webhook attempt ${attempt}/${retries} failed:`, error.message);
      
      if (attempt === retries) {
        console.error('All webhook attempts failed');
        return { success: false, error: error.message };
      }
      
      // Exponential backoff with jitter
      const backoffDelay = Math.min(1000 * Math.pow(2, attempt - 1) + Math.random() * 1000, 10000);
      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }

  // This should never be reached but TypeScript requires it
  return { success: false, error: 'Unknown webhook error' };
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, eventType, venue, guests, message } = body;

    // Generate unique identifiers for this submission
    const submissionId = crypto.randomUUID ? crypto.randomUUID() : `WEB_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const trackingId = `CRAVINGS_${Date.now()}_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Log the received data (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Received form data:', { 
        submissionId, 
        trackingId, 
        name, 
        email, 
        phone, 
        eventType, 
        venue, 
        guests, 
        message 
      });
    }

    // Basic validation - only name and email are required (based on your Lead.tsx)
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare payload for external webhook with unique identifiers
    const webhookPayload = {
      unique_id: submissionId,
      tracking_id: trackingId,
      timestamp: new Date().toISOString(),
      formType: 'Event Inquiry',
      data: {
        name,
        email,
        phone: phone || '',
        eventType: eventType || '',
        venue: venue || '',
        guests: guests || '',
        message: message || '',
      },
      source: 'Cravings Website',
      metadata: {
        ip_address: request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    request.headers.get('cf-connecting-ip') || 
                    'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
        submitted_at: new Date().toISOString(),
        form_version: '1.0',
      }
    };

    // Send email using Resend with BCC
    const emailPromise = resend.emails.send({
      from: 'Cravings Website <wecater@cravingsgroup.com>',
      to: [yourEmail!],
      bcc: [bccEmail],
      replyTo: email,
      subject: `[${trackingId}] New Event Inquiry: ${name} wants to connect!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Event Inquiry from Cravings</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #F26522 0%, #e35a1b 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🎉 New Event Inquiry!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Someone wants to plan an event with Cravings</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #eee; border-top: none;">
            <div style="background: #f0f0f0; padding: 10px; border-radius: 6px; margin-bottom: 20px; font-family: monospace; font-size: 12px;">
              <strong>🔑 Tracking ID:</strong> ${trackingId}<br>
              <strong>🆔 Submission ID:</strong> ${submissionId}
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #F26522; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p><strong style="color: #F26522;">👤 Name:</strong> ${name}</p>
              <p><strong style="color: #F26522;">📧 Email:</strong> <a href="mailto:${email}" style="color: #F26522;">${email}</a></p>
              ${phone ? `<p><strong style="color: #F26522;">📱 Phone:</strong> <a href="tel:${phone}" style="color: #F26522;">${phone}</a></p>` : ''}
              ${eventType ? `<p><strong style="color: #F26522;">🎪 Event Type:</strong> ${eventType}</p>` : ''}
              ${venue ? `<p><strong style="color: #F26522;">📍 Venue:</strong> ${venue}</p>` : ''}
              ${guests ? `<p><strong style="color: #F26522;">👥 Number of Guests:</strong> ${guests}</p>` : ''}
              ${message ? `
                <p><strong style="color: #F26522;">📝 Additional Message:</strong></p>
                <div style="margin-top: 8px; background: #f5f5f5; padding: 15px; border-radius: 6px; white-space: pre-line;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              ` : ''}
            </div>
            
            <div style="text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: #F26522; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: 500;">✉️ Reply to ${name}</a>
              ${phone ? `<a href="tel:${phone}" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: 500;">📱 Call Now</a>` : ''}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This inquiry was submitted from your Cravings website contact form.</p>
            <p>Time received: ${new Date().toLocaleString()}</p>
            <p style="font-family: monospace; font-size: 10px; margin-top: 10px;">Reference: ${trackingId}</p>
          </div>
        </body>
        </html>
      `,
      text: `
NEW EVENT INQUIRY FROM CRAVINGS WEBSITE

Tracking ID: ${trackingId}
Submission ID: ${submissionId}

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${eventType ? `Event Type: ${eventType}` : ''}
${venue ? `Venue: ${venue}` : ''}
${guests ? `Number of Guests: ${guests}` : ''}
${message ? `\nAdditional Message:\n${message}` : ''}

---
This inquiry was submitted at ${new Date().toLocaleString()}
Reference: ${trackingId}
      `,
    });

    // Send to webhook with retry logic
    const webhookPromise = sendToWebhook(webhookPayload);

    // Execute both promises
    const [emailResult, webhookResult] = await Promise.allSettled([emailPromise, webhookPromise]);

    // Handle email errors
    if (emailResult.status === 'rejected') {
      console.error('Resend error:', emailResult.reason);
      return NextResponse.json(
        { 
          error: `Failed to send inquiry: ${emailResult.reason.message}`,
          submissionId,
          trackingId
        },
        { status: 500 }
      );
    }

    const emailData = emailResult.value;
    if (emailData.error) {
      console.error('Resend error:', emailData.error);
      return NextResponse.json(
        { 
          error: `Failed to send inquiry: ${emailData.error.message}`,
          submissionId,
          trackingId
        },
        { status: 500 }
      );
    }

    // Log webhook result (don't fail the request if webhook fails)
    if (webhookResult.status === 'fulfilled') {
      const webhookResponse = webhookResult.value;
      if (webhookResponse.success) {
        console.log('Webhook sent successfully with ID:', submissionId);
      } else {
        console.error('Webhook failed:', webhookResponse.error);
        // Optionally, you can log to a monitoring service here
      }
    } else if (webhookResult.status === 'rejected') {
      console.error('Webhook request failed:', webhookResult.reason);
    }

    // Success response with unique identifiers
    return NextResponse.json(
      { 
        success: true,
        message: 'Inquiry sent successfully!',
        data: emailData.data,
        submissionId: submissionId,
        trackingId: trackingId,
        webhookStatus: webhookResult.status === 'fulfilled' && webhookResult.value.success ? 'sent' : 'failed'
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Server error:', error);
    
    // Return a proper JSON response even for unexpected errors
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}