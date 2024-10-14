const nodemailer = require('nodemailer');
const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

// Hàm tạo mã OTP ngẫu nhiên
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hàm gửi OTP qua email
const sendOtp = async (email) => {
  const otp = generateOtp();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'huy528797@gmail.com',
      pass: 'oswd gqqz vzam hqlm',
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
    await redisClient.set(email, otp, 'EX', 300);
    return { status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.' };
  } catch (error) {
    console.error('Có lỗi xảy ra khi gửi email:', error);
    throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
  }
};

// Hàm kiểm tra mã OTP
const validateOtp = async (email, otp) => {
  const storedOtp = await redisClient.get(email);

  if (storedOtp && storedOtp === otp) {
    await redisClient.del(email);
    return { status: 'OK', message: 'Mã OTP hợp lệ!' };
  } else {
    throw new Error('Mã OTP không hợp lệ!');
  }
};

module.exports = {
  generateOtp,
  sendOtp,
  validateOtp,
};
