const nodemailer = require('nodemailer');

// Hàm tạo mã OTP và gửi email OTP
const generateOtp = async (email) => {
  try {
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
      to: 'huy528797@gmail.com', // Gửi đến email của người dùng
      subject: 'Mã OTP của bạn',
      text: `Mã OTP của bạn là: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('OTP đã được gửi thành công');
    return { status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.', otp }; // Trả về mã OTP
  } catch (error) {
    console.error('Có lỗi xảy ra khi gửi email hoặc tạo OTP:', error);
    throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
  }
};

// Hàm kiểm tra mã OTP
const validateOtp = async (otp, userInput) => {
  try {
    if (otp === userInput) {
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
