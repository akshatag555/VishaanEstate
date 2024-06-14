const nodeMailer=require('nodemailer');
exports.sendEmail=async(options)=>{
    var transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5672041c29411c",
          pass: "3ff57a9a3d7bbd"
        }
      });
    const mailOptions={
        from:process.env.SMPT_MAIL,
        to: options.email,
        subject:options.subject,
        text:options.msg,
    }
    await transporter.sendMail(mailOptions)
}
