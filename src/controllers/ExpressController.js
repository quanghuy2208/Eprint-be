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
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  try {
    // console.log('Email nhận được:', email);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('OTP đã được tạo:', otp);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'huy528797@gmail.com',
        pass: 'oswd gqqz vzam hqlm',
      },
    });

    const mailOptions = {
      from: 'huy528797@gmail.com',
      to: 'huy528797@gmail.com',
      subject: 'Mã OTP của bạn',
      text: `Mã OTP của bạn là: ${otp}`,
    };

    await ensureRedisConnected();

    await transporter.sendMail(mailOptions);
    
    await redisClient.set(email, otp, 'EX', 300);
    
    console.log('OTP đã được gửi thành công và lưu vào Redis');
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
