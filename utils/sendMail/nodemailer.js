import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"UnicornMart" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};


export const sendApprovalMail = async (to, productName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Scrap Market" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Scrap Product Approved",
    html: `
      <h2>Your product has been approved 🎉</h2>
      <p><strong>${productName}</strong> is now live.</p>
    `,
  });
};