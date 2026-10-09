import express from 'express';
import http from 'http';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for leads, quote requests, and sent email logs
interface QuoteLead {
  id: string;
  timestamp: string;
  name: string;
  hoaName: string;
  email: string;
  phone: string;
  city: string;
  approxHomes: string;
  frequency?: string;
  message: string;
  estimatedWeeklyRate?: string;
  estimatedMonthlyRate?: string;
  status: 'New' | 'In Contact' | 'Proposal Sent';
  emailNotificationSent?: boolean;
}

interface ResidentLead {
  id: string;
  timestamp: string;
  residentName: string;
  communityName: string;
  email: string;
  phone: string;
  city: string;
  zipCode: string;
  hoaBoardContact?: string;
  notes?: string;
  emailNotificationSent?: boolean;
}

interface SentEmailLog {
  id: string;
  timestamp: string;
  type: 'HOA Quote Request' | 'Resident Request' | 'Test Email';
  to: string;
  subject: string;
  leadId: string;
  communityName: string;
  status: string;
  mode: string;
  htmlPreview?: string;
}

const quoteLeads: QuoteLead[] = [
  {
    id: 'gsq-1001',
    timestamp: new Date().toISOString(),
    name: 'Robert Vance',
    hoaName: 'Desert Ridge Estates HOA',
    email: 'rvance@desertridgehoa.org',
    phone: '(602) 555-0192',
    city: 'Phoenix',
    approxHomes: '250',
    message: 'Interested in valet service for 250 single-family homes starting next quarter.',
    estimatedWeeklyRate: '$7.25 / home / week',
    estimatedMonthlyRate: '$7.25 / home / week',
    status: 'In Contact',
    emailNotificationSent: true
  }
];

const residentLeads: ResidentLead[] = [];
const sentEmailLogs: SentEmailLog[] = [];

// Helper function to send email notifications for HOA Quotes
async function sendQuoteNotificationEmail(quote: QuoteLead): Promise<SentEmailLog> {
  const adminEmail = process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpFrom = process.env.SMTP_FROM || `"Gunny's Garbage Squad" <no-reply@gunnysgarbagesquad.com>`;

  const emailSubject = `🚨 New HOA Quote Request: ${quote.hoaName} (${quote.city}) - ${quote.name}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="background-color: #133c27; color: #ffffff; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 0.5px;">Gunny's Garbage Squad</h2>
        <p style="margin: 6px 0 0 0; font-size: 14px; color: #a7f3d0; font-weight: 600;">NEW HOA QUOTE REQUEST RECEIVED</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #0f172a; margin-top: 0; font-weight: 600;">Howdy Gunny,</p>
        <p style="font-size: 14px; color: #334155; line-height: 1.5;">A new community contact has submitted a quote request on your site. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b; width: 38%;">Quote ID:</td>
            <td style="padding: 10px; color: #0f172a; font-family: monospace;">${quote.id}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">HOA Community:</td>
            <td style="padding: 10px; color: #133c27; font-weight: bold; font-size: 15px;">${quote.hoaName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">City / Region:</td>
            <td style="padding: 10px; color: #0f172a;">${quote.city}, Arizona</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Contact Name:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: bold;">${quote.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Email Address:</td>
            <td style="padding: 10px; color: #0284c7; font-weight: bold;"><a href="mailto:${quote.email}">${quote.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Phone Number:</td>
            <td style="padding: 10px; color: #0f172a;"><a href="tel:${quote.phone}">${quote.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Community Size:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: bold;">${quote.approxHomes} homes</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Pickup Frequency:</td>
            <td style="padding: 10px; color: #133c27; font-weight: bold;">${quote.frequency || 'Once Weekly ($7.25/wk)'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Estimated Rate (Weekly):</td>
            <td style="padding: 10px; color: #047857; font-weight: bold;">${quote.estimatedWeeklyRate || quote.estimatedMonthlyRate || '$7.25 / home / week'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #64748b; vertical-align: top;">Notes / Questions:</td>
            <td style="padding: 10px; color: #0f172a;">${quote.message || 'None provided'}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${quote.email}?subject=Gunny's%20Garbage%20Squad%20-%20Proposal%20for%20${encodeURIComponent(quote.hoaName)}" 
             style="background-color: #133c27; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 14px;">
            ✉️ Reply Directly to ${quote.name} (${quote.email})
          </a>
        </div>
      </div>
      <div style="margin-top: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
        Dispatched automatically to ${adminEmail} from Gunny's Garbage Squad HOA Portal
      </div>
    </div>
  `;

  const emailLogEntry: SentEmailLog = {
    id: `email-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: 'HOA Quote Request',
    to: adminEmail,
    subject: emailSubject,
    leadId: quote.id,
    communityName: quote.hoaName,
    status: 'Sent',
    mode: smtpHost && smtpUser ? 'SMTP Production' : 'Logged & Dispatched',
    htmlPreview: htmlContent
  };

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: adminEmail,
        replyTo: quote.email,
        subject: emailSubject,
        html: htmlContent
      });

      console.log(`[Email Sent via SMTP] Delivered quote alert for ${quote.hoaName} to ${adminEmail}`);
      emailLogEntry.status = 'Delivered via SMTP';
    } catch (err: any) {
      console.error(`[SMTP Error] Could not send via SMTP:`, err?.message || err);
      emailLogEntry.status = `SMTP Attempt Failed (${err?.message || 'Check credentials'})`;
    }
  } else {
    console.log(`[Email Alert Logged] Target: ${adminEmail} | Subject: ${emailSubject}`);
  }

  sentEmailLogs.unshift(emailLogEntry);
  return emailLogEntry;
}

// Helper function to send email notifications for Resident Nominations
async function sendResidentNotificationEmail(residentLead: ResidentLead): Promise<SentEmailLog> {
  const adminEmail = process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpFrom = process.env.SMTP_FROM || `"Gunny's Garbage Squad" <no-reply@gunnysgarbagesquad.com>`;

  const emailSubject = `🏠 Resident Community Request: ${residentLead.communityName} (${residentLead.city}) - ${residentLead.residentName}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="background-color: #133c27; color: #ffffff; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 22px; font-weight: bold;">Gunny's Garbage Squad</h2>
        <p style="margin: 6px 0 0 0; font-size: 14px; color: #a7f3d0; font-weight: 600;">RESIDENT COMMUNITY REQUEST</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #0f172a; margin-top: 0;">Hi Gunny,</p>
        <p style="font-size: 14px; color: #334155;">A homeowner wants Gunny's Garbage Squad brought to their neighborhood:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b; width: 38%;">Resident Name:</td>
            <td style="padding: 10px; color: #0f172a; font-weight: bold;">${residentLead.residentName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Community Name:</td>
            <td style="padding: 10px; color: #133c27; font-weight: bold;">${residentLead.communityName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">City / Zip:</td>
            <td style="padding: 10px; color: #0f172a;">${residentLead.city} ${residentLead.zipCode ? `(${residentLead.zipCode})` : ''}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Resident Email:</td>
            <td style="padding: 10px; color: #0284c7;"><a href="mailto:${residentLead.email}">${residentLead.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">Resident Phone:</td>
            <td style="padding: 10px; color: #0f172a;">${residentLead.phone || 'N/A'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; color: #64748b;">HOA Board Contact:</td>
            <td style="padding: 10px; color: #0f172a;">${residentLead.hoaBoardContact || 'None provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #64748b; vertical-align: top;">Notes:</td>
            <td style="padding: 10px; color: #0f172a;">${residentLead.notes || 'None'}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${residentLead.email}?subject=Gunny's%20Garbage%20Squad%20-%20Thanks%20for%20requesting%20us%20for%20${encodeURIComponent(residentLead.communityName)}" 
             style="background-color: #133c27; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Contact Resident
          </a>
        </div>
      </div>
    </div>
  `;

  const emailLogEntry: SentEmailLog = {
    id: `email-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: 'Resident Request',
    to: adminEmail,
    subject: emailSubject,
    leadId: residentLead.id,
    communityName: residentLead.communityName,
    status: 'Sent',
    mode: smtpHost && smtpUser ? 'SMTP Production' : 'Logged & Dispatched',
    htmlPreview: htmlContent
  };

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

      await transporter.sendMail({
        from: smtpFrom,
        to: adminEmail,
        replyTo: residentLead.email,
        subject: emailSubject,
        html: htmlContent
      });
      emailLogEntry.status = 'Delivered via SMTP';
    } catch (err: any) {
      console.error(`[SMTP Error] Resident email failed:`, err?.message || err);
      emailLogEntry.status = `SMTP Attempt Failed (${err?.message || 'Check credentials'})`;
    }
  }

  sentEmailLogs.unshift(emailLogEntry);
  return emailLogEntry;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: "Gunny's Garbage Squad API",
    adminEmail: process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com',
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
    version: '1.0.0',
    localTime: new Date().toISOString()
  });
});

// Quote Request Endpoint
app.post('/api/quote', async (req, res) => {
  const { name, hoaName, email, phone, city, approxHomes, frequency, message } = req.body;

  if (!name || !hoaName || !email || !city) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all required fields (Name, HOA Name, Email, City).'
    });
  }

  const homesCount = parseInt(approxHomes) || 100;
  const freqLower = typeof frequency === 'string' ? frequency.toLowerCase() : '';
  const isTwiceWeekly = freqLower.includes('twice') || freqLower.includes('2x') || freqLower.includes('9.75');

  const rateTier = isTwiceWeekly 
    ? '$9.75 / home / week (Twice Weekly)' 
    : '$7.25 / home / week (Once Weekly)';

  const newQuote: QuoteLead = {
    id: `gsq-${Date.now().toString().slice(-5)}`,
    timestamp: new Date().toISOString(),
    name,
    hoaName,
    email,
    phone: phone || 'N/A',
    city,
    approxHomes: approxHomes || 'Unspecified',
    frequency: isTwiceWeekly ? 'Twice Weekly Pickup ($9.75/wk)' : 'Once Weekly Pickup ($7.25/wk)',
    message: message || 'None',
    estimatedWeeklyRate: rateTier,
    estimatedMonthlyRate: rateTier,
    status: 'New',
    emailNotificationSent: true
  };

  quoteLeads.push(newQuote);

  console.log(`[Quote Received] ${hoaName} (${city}) - ${name} (${email})`);

  // Dispatch Email Notification to Admin
  const emailLog = await sendQuoteNotificationEmail(newQuote);

  const adminEmail = process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com';

  return res.json({
    success: true,
    message: `Thank you, ${name}! Your HOA quote request for ${hoaName} in ${city} has been received. An instant notification email has been dispatched to ${adminEmail}.`,
    quoteId: newQuote.id,
    estimatedRateTier: rateTier,
    adminNotificationEmail: adminEmail,
    emailStatus: emailLog.status,
    nextSteps: 'A Gunny’s Garbage Squad HOA specialist will reach out within 24 business hours with a formal community proposal.'
  });
});

// Resident Request Endpoint
app.post('/api/resident-request', async (req, res) => {
  const { residentName, communityName, email, phone, city, zipCode, hoaBoardContact, notes } = req.body;

  if (!residentName || !communityName || !email || !city) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in Name, Community Name, Email, and City.'
    });
  }

  const newResidentLead: ResidentLead = {
    id: `res-${Date.now().toString().slice(-5)}`,
    timestamp: new Date().toISOString(),
    residentName,
    communityName,
    email,
    phone: phone || '',
    city,
    zipCode: zipCode || '',
    hoaBoardContact: hoaBoardContact || '',
    notes: notes || '',
    emailNotificationSent: true
  };

  residentLeads.push(newResidentLead);

  console.log(`[Resident Request] ${residentName} for ${communityName} in ${city}`);

  // Dispatch Email Notification
  const emailLog = await sendResidentNotificationEmail(newResidentLead);

  const adminEmail = process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com';

  return res.json({
    success: true,
    message: `Thanks ${residentName}! We’ve logged your request for ${communityName} and sent a notification email to ${adminEmail}. We’ll contact your HOA board to present Gunny’s valet service as an amenity!`,
    requestId: newResidentLead.id,
    adminNotificationEmail: adminEmail,
    emailStatus: emailLog.status
  });
});

// Service Area Check Endpoint
app.get('/api/service-check', (req, res) => {
  const query = (req.query.q as string || '').trim().toLowerCase();

  const activeCities = [
    'phoenix', 'mesa', 'chandler', 'gilbert', 'scottsdale', 'tempe',
    'glendale', 'peoria', 'surprise', 'goodyear', 'avondale', 'queen creek',
    'buckeye', 'maricopa'
  ];

  if (!query) {
    return res.json({
      status: 'active',
      cities: activeCities,
      message: 'Gunny’s Garbage Squad serves the entire Phoenix Metropolitan area and surrounding Arizona cities.'
    });
  }

  const isMatched = activeCities.some(c => c.includes(query) || query.includes(c));

  if (isMatched) {
    return res.json({
      status: 'active',
      query,
      matched: true,
      message: `Great news! Gunny’s Garbage Squad actively operates in ${query.toUpperCase()} and surrounding HOA communities.`,
      action: 'Ready to schedule or request an HOA proposal.'
    });
  } else {
    return res.json({
      status: 'expanding',
      query,
      matched: false,
      message: `We are actively expanding across Arizona! Submit a request for ${query.toUpperCase()} and we can expedite service rollout to your community.`,
      action: 'Submit expansion request.'
    });
  }
});

// Admin Lead & Dispatched Email Endpoint
app.get('/api/admin/leads', (req, res) => {
  res.json({
    adminEmail: process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com',
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
    quoteLeads,
    residentLeads,
    sentEmailLogs
  });
});

// Trigger Test Email
app.post('/api/admin/test-email', async (req, res) => {
  const targetEmail = req.body.email || process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com';
  
  const testQuote: QuoteLead = {
    id: `TEST-${Date.now().toString().slice(-4)}`,
    timestamp: new Date().toISOString(),
    name: 'Sample Board Member',
    hoaName: 'Test Community HOA',
    email: targetEmail,
    phone: '(602) 555-0100',
    city: 'Scottsdale',
    approxHomes: '180',
    message: 'This is a test notification email from Gunny’s Garbage Squad quote signup system.',
    estimatedWeeklyRate: '$7.25 / home / week',
    estimatedMonthlyRate: '$7.25 / home / week',
    status: 'New'
  };

  const emailLog = await sendQuoteNotificationEmail(testQuote);

  res.json({
    success: true,
    message: `Test quote email dispatched to ${targetEmail}`,
    emailLog
  });
});

async function startServer() {
  const server = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Gunny's Garbage Squad server running on http://0.0.0.0:${PORT}`);
    console.log(`Admin Notification Email destination: ${process.env.ADMIN_EMAIL || 'gunnysgarbagesquad@gmail.com'}`);
  });
}

startServer();

