import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const yourEmail = process.env.YOUR_EMAIL;

// Log environment check (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Resend API Key exists:', !!resendApiKey);
  console.log('Your email exists:', !!yourEmail);
}

if (!resendApiKey) {
  console.error('RESEND_API_KEY is missing from environment variables');
}

if (!yourEmail) {
  console.error('YOUR_EMAIL is missing from environment variables');
}

const resend = new Resend(resendApiKey);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, eventType, venue, guests, message } = body;

    // Log the received data (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Received form data:', { name, email, phone, eventType, venue, guests, message });
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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Cravings Website <wecater@cravingsgroup.com>', // Use Resend's default domain
      to: [yourEmail!], // Your email address
      replyTo: email, // So you can reply directly to the user
      subject: `New Event Inquiry: ${name} wants to connect!`,
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
          </div>
        </body>
        </html>
      `,
      text: `
NEW EVENT INQUIRY FROM CRAVINGS WEBSITE

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${eventType ? `Event Type: ${eventType}` : ''}
${venue ? `Venue: ${venue}` : ''}
${guests ? `Number of Guests: ${guests}` : ''}
${message ? `\nAdditional Message:\n${message}` : ''}

---
This inquiry was submitted at ${new Date().toLocaleString()}
      `,
    });

    // Handle Resend errors
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: `Failed to send email: ${error.message}` },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Inquiry sent successfully!',
        data: data
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