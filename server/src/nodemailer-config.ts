import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kenalexmv@gmail.com',
    pass: 'jhyv pzcr gmmz csyx',
  },
});

export default transporter;
