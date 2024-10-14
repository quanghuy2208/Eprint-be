const nodemailer = require('nodemailer');
const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

// Hàm tạo mã OTP, lưu vào Redis và gửi email OTP
const generateOtp = async (email) => {
  console.log("aaaaaaaaaaaa")
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Thiết lập cấu hình gửi email
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
    console.error('Có lỗi xảy ra khi gửi email hoặc tạo OTP:', error);
    throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
  }
};

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
  validateOtp,
};
