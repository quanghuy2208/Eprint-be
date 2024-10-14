const nodemailer = require('nodemailer');

// Hàm tạo mã OTP và gửi email OTP
const generateOtp = async (email, res) => {
  try {
    console.log(res.data)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpsend = otp;

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
      text: `Mã OTP của bạn là: ${otpsend}`,
    };
    await transporter.sendMail(mailOptions);
    const response = { status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.'};
    // console.log('OTP đã được gửi thành công');
    return res.status(200).json(response);
  } catch (error) {
    // console.error('Có lỗi xảy ra khi gửi email hoặc tạo OTP:', error);
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
