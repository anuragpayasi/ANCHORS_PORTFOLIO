import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const verifysmtpConnection = async() => {
  try {
    await transporter.verify()
    console.log("smtp connected to email successfully")
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendInquiryEmail = async (inquiry) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.MAIL_TO) {
    throw new Error('SMTP configuration is incomplete');
  }


  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    replyTo: inquiry.email,
    subject: `New Booking Inquiry from ${inquiry.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #11353a;">
        <h2>New Anchor Booking Inquiry</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Phone:</strong> ${inquiry.phone}</p>
        <p><strong>Event Type:</strong> ${inquiry.eventType}</p>
        <p><strong>Budget:</strong> ${inquiry.budget}</p>
        <p><strong>Message:</strong></p>
        <p>${inquiry.message}</p>
      </div>
    `,
  });
};
