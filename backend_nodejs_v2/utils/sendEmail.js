// import necessary libraries
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    
    // create transporter object to send email
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    // send email with defined transport object
    const message = {
        
        // sender address
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, 
        
        // list of recievers
        to: options.email,
        
        // subject line
        subject: options.subject,

        // plain text body
        text: options.message
    };

    const info = await transporter.sendMail(message);

    console.log("Message sent : %s", info.messageId);
}

module.exports = sendEmail;