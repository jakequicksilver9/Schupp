var nodemailer = require('nodemailer');
const User = require('../classes/user')
const errors = require('../classes/errors')
const notification = require('../controllers/notificationController')


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zap.paz.zap.zap@gmail.com',
    pass: 'pissword1'
  }
});




exports.email = async (req, res, next) => {
    try {
      const userEmail = req.body.email
      const subject = req.body.subject
      const content = req.body.content
      var mailOptions = {
        from: 'zap.paz.zap.zap@gmail.com',
        to: userEmail,
        subject: subject,
        text: content

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          alert('email sent')
          console.log('Email sent: ' + info.response);
        }
      });
      
    } catch (error) {
        res.status(500).json({
            data: { message: "failure" }
        })
        next(error)
    }
}