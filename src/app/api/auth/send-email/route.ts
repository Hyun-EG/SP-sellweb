import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../../lib/db';
import Verification from '../../../../../models/Verification';

const SALT_ROUNDS = 10;

const generateVerificationCode = () => {
  return Math.random().toString(36).slice(-6);
};

const sendVerificationEmail = async (
  email: string,
  verificationCode: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'naver',
    auth: {
      user: process.env.NAVER_EMAIL,
      pass: process.env.NAVER_PASS_KEY,
    },
  });

  const mailOptions = {
    from: process.env.NAVER_EMAIL,
    to: email,
    subject: '[Sellweb] 인증번호',
    text: `귀하의 인증번호는 ${verificationCode}입니다.`,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    await connectDB();

    const verificationCode = generateVerificationCode();
    const hashedCode = await bcrypt.hash(verificationCode, SALT_ROUNDS);

    await Verification.findOneAndUpdate(
      { email },
      { code: hashedCode, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({ message: '이메일 발송 성공' }, { status: 200 });
  } catch (error) {
    console.error('인증번호 발송 중 오류 발생:', error);
    return NextResponse.json(
      {
        message: '서버 오류',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
