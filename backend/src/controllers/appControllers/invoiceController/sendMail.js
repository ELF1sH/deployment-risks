const { SendInvoice } = require('@/emailTemplate/SendEmailTemplate');

const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

// HTTP handler
const mail = async (req, res) => {
  try {
    const email = "genzeartem0@gmail.com";
    const name = "Joe";
    const link = "induar.com";

    if (!email || !name || !link) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: email, name, or link',
      });
    }

    // Configure Mailtrap transporter
    const transport = Nodemailer.createTransport(
      MailtrapTransport({
        token: process.env.MAILTRAP_TOKEN || "5a40257b5beeb0bbe07af95bfceae524",
      })
    );

    // Email sender info
    const sender = {
      address: process.env.IDURAR_APP_EMAIL || "hello@demomailtrap.co",
      name: "Custom IDURAR App",
    };

    // Send email
    const info = await transport.sendMail({
      from: sender,
      to: email,
      subject: 'Invoice | idurar',
      html: SendInvoice({ name: name }),
      category: 'invoice',
    });

    return res.status(200).json({
      success: true,
      message: 'Invoice email sent successfully',
      info,
    });

  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message,
    });
  }
};

module.exports = mail;
