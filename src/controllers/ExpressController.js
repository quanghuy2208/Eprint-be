const nodemailer = require('nodemailer');

// Hàm tạo mã OTP và gửi email OTP
const generateOtp = async (req, res) => {
  try {
    console.log(req.body)
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
      to: req.body.email,
      subject: 'Mã OTP của bạn',
      text: `Mã OTP của bạn là: ${otpsend}`,
    };
    await transporter.sendMail(mailOptions);
    const response = { status: 'OK', message: 'Mã OTP đã được gửi vào email của bạn.'};
    return res.status(200).json(response);
  } catch (error) {
    throw new Error('Có lỗi xảy ra. Vui lòng thử lại.');
  }
};

// Hàm kiểm tra mã OTP
const validateOtp = async (otp, req, res) => {
  try {
    console.log(req.body)
    if (otp === req.body.userInput) {
    const response = { status: 'OK', message: 'Mã OTP hợp lệ!'};
    return res.status(200).json(response);
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
