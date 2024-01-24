import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_TO,
  subject: "Website down",
  text: `${process.env.WEBSITE_TO_CHECK} is down!`,
};

const sendFailEmail = () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendFailEmail;
