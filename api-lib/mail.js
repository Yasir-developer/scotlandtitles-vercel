// This project uses the nodemailer library to send email
// However, it is recommended to switch over to dedicated email services
// like Mailgun, AWS SES, etc.
import nodemailer from "nodemailer";

// console.log(process.env.NODEMAILER_CONFIG);

const nodemailerConfig =
  '{"service":"Gmail","auth":{"user":"alifr849@gmail.com","pass":"55678926"}}'
    ? JSON.parse(
        '{"service":"Gmail","auth":{"user":"alifr849@gmail.com","pass":"55678926"}}'
      )
    : {};

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  },
  secure: true,
});

export async function sendMail({ from, to, subject, html }) {
  try {
    console.log("====send email==== Working ====");
    await transporter.sendMail({
      from: "info@scotlandtitles.com",
      to,
      subject,
      html,
    });
  } catch (e) {
    console.error(e);
    throw new Error(`Could not send email: ${e.message}`);
  }
}

export const CONFIG = {
  // TODO: Replace with the email you want to use to send email
  from: nodemailerConfig?.auth?.user,
};
