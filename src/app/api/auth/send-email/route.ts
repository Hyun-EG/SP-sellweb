import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';
import crypto from 'crypto';

const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString('hex'); // 인증번호 생성
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
    subject: '비밀번호 찾기 인증번호',
    text: `귀하의 비밀번호 찾기 인증번호는 ${verificationCode}입니다.`,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    // DB 연결
    await connectDB();

    // 사용자 찾기
    const user = await User.findOne({ userId, email });
    if (!user) {
      return NextResponse.json(
        { message: '입력한 정보와 일치하는 계정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 인증번호 생성 및 이메일 발송
    const verificationCode = generateVerificationCode();
    await sendVerificationEmail(email, verificationCode);

    // 인증번호를 DB에 저장하거나 메모리 캐시에 저장하는 로직 필요

    return NextResponse.json(
      { message: '인증번호가 이메일로 전송되었습니다.' },
      { status: 200 }
    );
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
