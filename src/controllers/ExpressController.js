const nodemailer = require('nodemailer');
let otpsend

// Hàm tạo mã OTP và gửi email OTP
const generateOtp = async (req, res) => {
  try {
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

const validateOtp = async (req, res) => {
  console.log(req)
  try {
    if (otpsend === req.body.userInput) {
    const response = { status: 'OK', message: 'Mã OTP hợp lệ!'};
    return res.status(200).json(response);
    } else {
      const response = {message: 'Mã OTP không hợp lệ!'};
    return res.status(200).json(response);
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
