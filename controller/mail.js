const nodemailer = require('nodemailer')
const sendEmail = async ({ to, subject, text, attachments }) => {
   

    if (!to || typeof to !== 'string' || to.trim() === '') {
      throw new Error('Recipient email (to) is missing or invalid');
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'knikniknikni506@gmail.com',
        pass: 'nivj gshc dvkv kdzs',
      },
    });

    const mailOptions = {
      from: 'knikniknikni506@gmail.com',
      to,
      subject,
      text,
      attachments, // Use the provided attachments
    };

    await transporter.sendMail(mailOptions);
  };

  module.exports = sendEmail;
