var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
  const credetial = {
    service: 'Gmail',
    auth: {
      user: 'hpnewgd123@gmail.com',
      pass: '123TqWEr123'
    }
  };

  const transporter = nodemailer.createTransport(credetial);

  const mailOptions = {
    from: req.body.name + '<' + req.body.email + '>',
    to: credetial.auth.user,
    subject: 'Website submission',
    text: req.body.message,
    html: '<ul>' +
      '<li>' + req.body.name + '</li>' +
      '<li>' + req.body.email + '</li>' +
      '<li>' + req.body.message + '</li>'
    + '</ul>'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Message Sent', info.response());
      res.redirect('/');
    }
  });
});

module.exports = router;
