import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { to, code } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'naver',
      auth: {
        user: process.env.NAVER_EMAIL,
        pass: process.env.NAVER_PASS_KEY,
      },
    });

    const mailOptions = {
      from: process.env.NAVER_EMAIL,
      to: to,
      subject: '이메일 인증 코드',
      text: `회원가입을 위한 인증 코드는 ${code} 입니다.`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: '이메일 발송 성공' }, { status: 200 });
  } catch (error) {
    console.error('이메일 발송 실패', error);
    return NextResponse.json({ message: '이메일 발송 실패' }, { status: 500 });
  }
}
