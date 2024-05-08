const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: 'outlook.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'it@everbolt.lk',
            pass: 'EVER@456'
        }
    });

    let info = await transporter.sendMail({
        from: 'it@everbolt.lk',
        to: to,
        subject: subject,
        text: text
    });

    console.log('Message sent: %s', info.messageId);
};

module.exports = { sendEmail };
