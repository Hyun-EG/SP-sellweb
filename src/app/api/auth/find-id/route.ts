import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import { connectDB } from '../../../../lib/mongo';

export async function POST(request: Request) {
  await connectDB();

  try {
    const { name, phoneNumber, otp } = await request.json();

    const user = await User.findOne({ userName: name, phoneNumber });
    if (!user) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const verificationResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/confirm-pass-code`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      }
    );

    const verificationData = await verificationResponse.json();

    if (verificationData.status !== 'approved') {
      return NextResponse.json(
        { message: '인증번호가 잘못되었습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ userId: user.userId });
  } catch (error) {
    console.error('아이디 찾기 오류:', error);
    return NextResponse.json({ error: '아이디 찾기 오류' }, { status: 500 });
  }
}
