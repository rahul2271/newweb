import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, paymentId } = await req.json();

    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    console.log("Sending email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rraahhuullch@gmail.com", // your Gmail
        pass: "iafgiersywqegryv",       // Gmail App Password
      },
    });

    const mailOptions = {
      from: `"RC Tech Solutions" <rraahhuullch@gmail.com>`,
      to: email,
      subject: "Your Student Developer eBook 📚",
      text: `Hi ${name},\n\nThank you for your purchase! Payment ID: ${paymentId}\n\nHere is your eBook: https://yourwebsite.com/ebook\n\nHappy learning! 🚀`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
