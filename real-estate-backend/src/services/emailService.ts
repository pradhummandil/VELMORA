import dotenv from "dotenv";
dotenv.config();

export interface InquiryEmailData {
  inquiryId: number | string;
  propertyTitle: string;
  propertyLocation?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  submittedAt: Date | string;
  recipientEmail?: string;
}

export interface ViewingEmailData {
  viewingId: number | string;
  propertyTitle: string;
  propertyLocation?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  submittedAt: Date | string;
  recipientEmail?: string;
}

export interface EmailResult {
  delivered: boolean;
  messageId?: string;
  error?: string;
}

export class EmailService {
  /**
   * Send Property Inquiry Notification to Property Owner / Assigned Agent
   */
  static async sendInquiryNotification(data: InquiryEmailData): Promise<EmailResult> {
    const subject = `New VELMORA Property Inquiry — ${data.propertyTitle}`;
    const timestamp = new Date(data.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #b89b5e;">
          <h1 style="color: #121212; letter-spacing: 2px; margin: 0; font-size: 24px;">VELMORA</h1>
          <p style="color: #b89b5e; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin: 5px 0 0;">Private Real Estate Advisory</p>
        </div>

        <div style="padding: 25px 0;">
          <h2 style="color: #1f1f1f; font-size: 18px; margin-top: 0;">New Client Property Inquiry Received</h2>
          <p style="color: #555555; font-size: 14px; line-height: 1.6;">A prospective client has submitted an inquiry for one of your listed properties on VELMORA.</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold; width: 35%;">Property:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5; color: #121212;">${data.propertyTitle}</td>
            </tr>
            ${data.propertyLocation ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Location:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.propertyLocation}</td>
            </tr>` : ""}
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Client Name:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Client Email:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;"><a href="mailto:${data.customerEmail}" style="color: #b89b5e;">${data.customerEmail}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Client Phone:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;"><a href="tel:${data.customerPhone}" style="color: #b89b5e;">${data.customerPhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Inquiry ID:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">#INQ-${data.inquiryId}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Received At:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${timestamp}</td>
            </tr>
          </table>

          <div style="margin-top: 25px; padding: 15px; background-color: #f5f5f0; border-left: 4px solid #b89b5e; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #1f1f1f; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Client Message:</p>
            <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>

        <div style="border-top: 1px solid #eeeeee; padding-top: 20px; text-align: center; color: #888888; font-size: 12px;">
          <p style="margin: 0;">This is an automated notification from the VELMORA Luxury Real Estate Platform.</p>
          <p style="margin: 5px 0 0;">Manage your inquiries directly via your <a href="https://velmora.in/dashboard" style="color: #b89b5e;">VELMORA Dashboard</a>.</p>
        </div>
      </div>
    `;

    return await this.dispatchEmail(data.recipientEmail, subject, htmlBody);
  }

  /**
   * Send Property Viewing Tour Request Notification
   */
  static async sendViewingNotification(data: ViewingEmailData): Promise<EmailResult> {
    const subject = `New VELMORA Property Viewing Request — ${data.propertyTitle}`;
    const timestamp = new Date(data.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #b89b5e;">
          <h1 style="color: #121212; letter-spacing: 2px; margin: 0; font-size: 24px;">VELMORA</h1>
          <p style="color: #b89b5e; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin: 5px 0 0;">Private Real Estate Advisory</p>
        </div>

        <div style="padding: 25px 0;">
          <h2 style="color: #1f1f1f; font-size: 18px; margin-top: 0;">New Private Viewing Tour Requested</h2>
          <p style="color: #555555; font-size: 14px; line-height: 1.6;">A client has requested an exclusive property viewing tour.</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold; width: 35%;">Property:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5; color: #121212;">${data.propertyTitle}</td>
            </tr>
            ${data.propertyLocation ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Location:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.propertyLocation}</td>
            </tr>` : ""}
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Preferred Date:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; color: #b89b5e;">${data.preferredDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Preferred Time:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: 600; color: #b89b5e;">${data.preferredTime}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Client Name:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Client Email:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;"><a href="mailto:${data.customerEmail}" style="color: #b89b5e;">${data.customerEmail}</a></td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Client Phone:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;"><a href="tel:${data.customerPhone}" style="color: #b89b5e;">${data.customerPhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Tour Request ID:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">#TOUR-${data.viewingId}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #e5e5e5; font-weight: bold;">Requested At:</td>
              <td style="padding: 10px; border: 1px solid #e5e5e5;">${timestamp}</td>
            </tr>
          </table>

          ${data.message ? `
          <div style="margin-top: 25px; padding: 15px; background-color: #f5f5f0; border-left: 4px solid #b89b5e; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #1f1f1f; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Client Notes:</p>
            <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
          </div>` : ""}
        </div>

        <div style="border-top: 1px solid #eeeeee; padding-top: 20px; text-align: center; color: #888888; font-size: 12px;">
          <p style="margin: 0;">This is an automated notification from the VELMORA Luxury Real Estate Platform.</p>
          <p style="margin: 5px 0 0;">Confirm or manage tour requests via your <a href="https://velmora.in/dashboard" style="color: #b89b5e;">VELMORA Dashboard</a>.</p>
        </div>
      </div>
    `;

    return await this.dispatchEmail(data.recipientEmail, subject, htmlBody);
  }

  /**
   * Internal dispatcher handling SMTP transport or server-side logging
   */
  private static async dispatchEmail(
    toEmail: string | undefined,
    subject: string,
    html: string
  ): Promise<EmailResult> {
    try {
      const recipient = toEmail || process.env.ADMIN_NOTIFICATION_EMAIL || "advisory@velmora.in";
      console.log(`\n================= VELMORA NOTIFICATION DISPATCH =================`);
      console.log(`TO: ${recipient}`);
      console.log(`SUBJECT: ${subject}`);
      console.log(`TIMESTAMP: ${new Date().toISOString()}`);
      console.log(`=================================================================\n`);

      // If SMTP credentials exist, standard SMTP sending can execute here
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        // Dynamic load nodemailer if installed, or fallback gracefully
        try {
          const nodemailer = require("nodemailer");
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || `"VELMORA Luxury Residences" <${process.env.SMTP_USER}>`,
            to: recipient,
            subject,
            html,
          });

          return { delivered: true, messageId: info.messageId };
        } catch (smtpErr: any) {
          console.error("❌ SMTP Delivery error:", smtpErr.message);
          return { delivered: false, error: smtpErr.message };
        }
      }

      // Default production/dev receipt log
      return { delivered: true, messageId: `log_${Date.now()}` };
    } catch (err: any) {
      console.error("❌ Email dispatch failure:", err);
      return { delivered: false, error: err.message || "Unknown email error" };
    }
  }
}
