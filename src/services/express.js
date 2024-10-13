const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { callbackPromise } = require('nodemailer/lib/shared');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const otpStore = {};

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post('/api/user/loginOrSignUpPage/express', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'huy528797@gmail.com',
      pass: 'mipg okvb wbvp lavd'
    },
  });

  const mailOptions = {
    from: 'huy528797@gmail.com',
    to: email,
    subject: 'Mã OTP của bạn',
    text: `Mã OTP của bạn là: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    otpStore[email] = otp;
    
    // Trả về OTP cùng với thông báo
    res.status(200).json({ status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.', otp });
  } catch (error) {
    console.error('Có lỗi xảy ra khi gửi email:', error);
    res.status(500).json({ status: 'ERROR', message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
  }
});


app.post('/api/user/validate-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email];
    return res.status(200).json({ status: 'OK', message: 'Mã OTP hợp lệ!' });
  }else{
    console.log(otp)
    return res.status(401).json({ status: 'ERROR', message: 'Mã OTP không hợp lệ!' });
  }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
