import nodemailer from "nodemailer";

async function SendMail(dest, subject, content) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Hotmail",
      //host: process.env.HOST,
      //port: process.env.PORT,
      //secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USERNAME, // nossa email
      to: dest, //email do usuário que se cadastrou 
      subject: subject, //assunto
      html: content,
    };

    // Dispara e-mail para o usuário
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export default SendMail;