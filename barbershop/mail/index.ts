import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
  host: process.env.MAIL_HOST!,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
