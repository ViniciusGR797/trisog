import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PWD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_AUTH_USER,
      to: email,
      subject: "Welcome to Our Travel Newsletter!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
            <style>
            body {
                font-family: 'Inter', sans-serif;
                background-color: #F7F8FA;
                color: #041036;
                padding: 20px;
                border-radius: 10px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #F7F8FA;
                border-radius: 10px;
            }
            h1 {
                text-align: center;
                color: #FD5056;
                font-size: 2rem;
                font-weight: bold;
            }
            p {
                font-size: 1.2rem;
                margin-bottom: 10px;
                color: #041036;
                text-align: justify;
            }
            strong {
                color: #FD5056;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <h1>Welcome to Our Travel Newsletter!</h1>
            <p>Hi there,</p>
            <p>Thank you for <strong>subscribing</strong> to our <strong>travel newsletter!</strong> You'll now receive updates on the <strong>latest trips</strong>, <strong>exciting destinations</strong>, and <strong>tourist activities</strong> straight to your inbox.</p>
            <p>We're thrilled to have you on board and can't wait to share our <strong>travel adventures</strong> with you.</p>
            <p><strong>Happy travels!</strong></p>
            <p>Best regards,</p>
            <p>The Trisog Team</p>
            </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
