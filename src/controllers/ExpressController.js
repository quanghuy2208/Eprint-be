const nodemailer = require('nodemailer');
const redis = require('redis');

// Tạo Redis client kết nối tới Redis Cloud
const redisClient = redis.createClient({
  url: 'redis://default:C8q7X2GxVABvpPkgStP1Pv8DLTGIEqZE@redis-12283.c1.us-central1-2.gce.redns.redis-cloud.com:12283',
});

// Bắt lỗi Redis
redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

// Hàm đảm bảo Redis được kết nối trước khi thực hiện
const ensureRedisConnected = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

// Hàm tạo mã OTP, lưu vào Redis và gửi email OTP
const generateOtp = async (email) => {
  try {
    // Kết nối Redis nếu chưa kết nối
    await ensureRedisConnected();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('OTP đã được tạo:', otp);

    // Thiết lập cấu hình gửi email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'huy528797@gmail.com',
        pass: 'oswd gqqz vzam hqlm',  // Thay mật khẩu của bạn ở đây
      },
    });

    const mailOptions = {
      from: 'huy528797@gmail.com',
      to: 'huy528797@gmail.com',  // Sử dụng email nhận từ client
      subject: 'Mã OTP của bạn',
      text: `Mã OTP của bạn là: ${otp}`,
    };

    // Gửi email và lưu OTP vào Redis với thời gian hết hạn 300 giây (5 phút)
    await transporter.sendMail(mailOptions);
    await redisClient.set(email, otp, 'EX', 300);

    console.log('OTP đã được gửi thành công và lưu vào Redis');
    return { status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.' };
  } catch (error) {
    console.error('Có lỗi xảy ra khi gửi email hoặc tạo OTP:', error);
    throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
  }
};

// Hàm kiểm tra mã OTP
const validateOtp = async (email, otp) => {
  try {
    await ensureRedisConnected(); // Đảm bảo Redis đã kết nối

    const storedOtp = await redisClient.get(email);

    if (storedOtp && storedOtp === otp) {
      await redisClient.del(email); // Xóa OTP sau khi xác minh thành công
      return { status: 'OK', message: 'Mã OTP hợp lệ!' };
    } else {
      throw new Error('Mã OTP không hợp lệ!');
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi xác minh OTP:', error);
    throw new Error('Có lỗi xảy ra khi xác minh OTP.');
  }
};

module.exports = {
  generateOtp,
  validateOtp,
};
