const nodemailer = require('nodemailer');
let otpCode;

// Send OTP via Email
app.post('/send_otp', (req, res) => {
    const email = req.body.email;
    otpCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    // Send email logic
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password'
        }
    });

    let mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otpCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error sending OTP');
        } else {
            res.send('OTP sent successfully');
        }
    });
});

// Verify OTP
app.post('/verify_otp', (req, res) => {
    const { otp } = req.body;
    if (otp == otpCode) {
        res.send('OTP verified');
    } else {
        res.send('Invalid OTP');
    }
});
