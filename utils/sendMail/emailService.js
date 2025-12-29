import nodemailer from "nodemailer";

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generic email sender
export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"ScrapShop" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Order confirmation email
export const sendOrderConfirmation = async (to, order) => {
  const { name, productName, quantity, productPrice, total, address } = order;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #28a745;">Hello ${name},</h2>
      <p>Thank you for your order! Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <th style="text-align: left; border-bottom: 1px solid #ccc; padding: 8px;">Product</th>
          <th style="text-align: left; border-bottom: 1px solid #ccc; padding: 8px;">Quantity (Kg)</th>
          <th style="text-align: left; border-bottom: 1px solid #ccc; padding: 8px;">Price per Kg</th>
          <th style="text-align: left; border-bottom: 1px solid #ccc; padding: 8px;">Total</th>
        </tr>
        <tr>
          <td style="padding: 8px;">${productName}</td>
          <td style="padding: 8px;">${quantity}</td>
          <td style="padding: 8px;">₹${productPrice}</td>
          <td style="padding: 8px;">₹${total}</td>
        </tr>
      </table>
      <p><strong>Pickup/Delivery Address:</strong> ${address}</p>
      <p>We will contact you soon for further details.</p>
      <p style="color: #28a745;">Thank you for choosing ScrapShop! 💚</p>
    </div>
  `;

  await sendEmail(to, "Your Order is Confirmed ✅", html);
};

// Example: Approval email (for admin actions)
export const sendApprovalMail = async (to, productName) => {
  const html = `
    <h2>Your product has been approved 🎉</h2>
    <p><strong>${productName}</strong> is now live.</p>
  `;
  await sendEmail(to, "Scrap Product Approved", html);
};
