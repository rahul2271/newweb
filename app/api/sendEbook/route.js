import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, paymentId } = await req.json();

    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "rraahhuullch@gmail.com",
        pass: process.env.GMAIL_PASS || "iafgiersywqegryv", // App Password
      },
    });

    // Optional: Verify SMTP connection before sending
    await transporter.verify();

    const mailOptions = {
      from: `"RC Tech Solutions" <${process.env.GMAIL_USER || "rraahhuullch@gmail.com"}>`,
      to: email,
      subject: "Your Student Developer eBook 📚",
      text: `Hi ${name},\n\nThank you for your purchase! Payment ID: ${paymentId}\n\nHere is your eBook: https://drive.google.com/file/d/1I7ueXiIvqEADsv5oduFhRtjO_wW7HZww/view?usp=sharing\n\nHappy learning! 🚀`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error); // 👈 This will print the actual cause in terminal
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
