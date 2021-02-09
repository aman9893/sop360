
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var unirest = require("unirest");

///------------------otp check code -----------------------------------------------------------

module.exports.sendBulkMessage = function (req, res) {
    console.log("phone" + req.body.customerName)
       let phone =req.body.customerName
       var result = phone.map(function (x) { 
        return parseInt(x, 10); 
      });
      console.log(result)

        var unirest = require("unirest");
        var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");
        req.query({
            "authorization": "TV5SOCx7yoAPHqiUY9dbIL8vB0gmX1asrEc3Zl26eMfpkKGRJzy0PfTUZxrzMDX4amuS1cl3Og7bvnLd",
            "sender_id": "FSTSMS",
            "message": "This is a test message",
            "language": "english",
            "route": "p",
            "numbers": result,
          });
          
          req.headers({
            "cache-control": "no-cache"
          });
          
          
          req.end(function (res) {
            if (res.error) throw new Error(res.error);
          
            console.log(res.body);
          });
          
            // res.json({
            //     status: true,
            //     flag: 'Message',
            //     message: 'Message Send Successfully'
            // })
     
    }





  // if (req.body.value == 'nootpCheck' && req.body.flag === 'email') {
    //     console.log("email" + req.body.email)
    //     var email = req.body.email;
    //     console.log(email)
    //     var sql = 'SELECT * FROM users WHERE email = ?';
    //     connection.query(sql, [req.body.email], function (error, results, fields) {
    //         console.log(results)
    //         if (error) {
    //             res.json({
    //                 status: false,
    //                 message: 'Email id not there ..'
    //             })
    //         }

    //         else {
    //             if (results && results.length > 0) {
    //                 userId = results[0].id;
    //                 let transporter = nodemailer.createTransport({
    //                     host: "smtp.gmail.com",
    //                     port: 465,
    //                     secure: true,
    //                     service: 'Gmail',
    //                     auth: {
    //                         user: 'aman9893jain@gmail.com',
    //                         pass: 'gsvwhxntvkjqrulk',
    //                     }
    //                 });
    //                 var mailOptions = {
    //                     to: email,
    //                     subject: "Otp for registration is: ",
    //                     html: "<h3>OTP for ShopMart 360 account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    //                 };

    //                 transporter.sendMail(mailOptions, (error, info) => {
    //                     if (error) {
    //                         return console.log(error);
    //                     }
    //                     console.log('Message sent: %s', info);
    //                     console.log('Message sent: %s', info.messageId);
    //                     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //                     res.json({
    //                         status: true,
    //                         flag: 'otpsend',
    //                         message: 'Otp Send Successfully'
    //                     })
    //                 });
    //             }
    //             else {
    //                 res.json({
    //                     status: false,
    //                     message: 'Email id not there'
    //                 })
    //             }

    //         }
    //     });
    // }














    // //it's a number
    // var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");
    // req.headers({
    //   "authorization": "TV5SOCx7yoAPHqiUY9dbIL8vB0gmX1asrEc3Zl26eMfpkKGRJzy0PfTUZxrzMDX4amuS1cl3Og7bvnLd"
    // });
    // req.form({
    //   "sender_id": "FSTSMS",
    //   "message": "This is a test message",
    //   "language": "english",
    //   "route": "p",
    //   "numbers": '9893259754',
    // });
    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);

    //   console.log(res.body);
    // });

// app.post('/resend',function(req,res){
//     var mailOptions={
//         to: email,
//        subject: "Otp for registration is: ",
//        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
//      };

//      transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);   
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         res.render('otp',{msg:"otp has been sent"});
//     });

// });