// router/ExpressRouter.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Thay thế bằng email của bạn
      pass: 'your-email-password',    // Thay thế bằng mật khẩu email của bạn
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Mã OTP của bạn',
    text: `Mã OTP của bạn là: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await redisClient.set(email, otp, 'EX', 300); // Lưu OTP vào Redis với thời gian hết hạn 300 giây
    res.status(200).json({ status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.' });
  } catch (error) {
    console.error('Có lỗi xảy ra khi gửi email:', error);
    res.status(500).json({ status: 'ERROR', message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
  }
});

// Route xác thực OTP
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = await redisClient.get(email);

  if (storedOtp && storedOtp === otp) {
    await redisClient.del(email); // Xóa OTP sau khi xác thực thành công
    return res.status(200).json({ status: 'OK', message: 'Mã OTP hợp lệ!' });
  } else {
    return res.status(401).json({ status: 'ERROR', message: 'Mã OTP không hợp lệ!' });
  }
});

module.exports = router;
