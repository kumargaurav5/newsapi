import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});


export const sendEmail = async (toMail ,subject ,body) => {
    const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: toMail,
        subject: subject ,
        html: body
    });
    console.log("h3jfbuwjqrfgbuo")
}