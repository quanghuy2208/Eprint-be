const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const redis = require('redis');

// Khởi tạo client Redis
const redisClient = redis.createClient({
  url: 'redis://localhost:6379',
});

// Middleware để xử lý lỗi Redis
redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

// Hàm tạo mã OTP ngẫu nhiên
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route gửi OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  // Gửi email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Thay bằng email của bạn
      pass: 'your-email-password', // Thay bằng mật khẩu của bạn
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
    // Lưu OTP vào Redis với thời gian hết hạn
    await redisClient.set(email, otp, 'EX', 300); // Hết hạn sau 5 phút
    res.status(200).json({ status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.' });
  } catch (error) {
    console.error('Có lỗi xảy ra khi gửi email:', error);
    res.status(500).json({ status: 'ERROR', message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
  }
});

// Kiểm tra mã OTP
app.post('/api/user/validate-otp', async (req, res) => {
  const { email, otp } = req.body;

  // Lấy mã OTP từ Redis
  const storedOtp = await redisClient.get(email);

  if (storedOtp && storedOtp === otp) {
    // Xóa mã OTP sau khi xác thực thành công
    await redisClient.del(email);
    return res.status(200).json({ status: 'OK', message: 'Mã OTP hợp lệ!' });
  } else {
    return res.status(401).json({ status: 'ERROR', message: 'Mã OTP không hợp lệ!' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
