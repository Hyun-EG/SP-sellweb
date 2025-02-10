import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import { connectDB } from '../../../../lib/mongo';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface DecodedToken {
  userId: string;
}

export async function POST(request: Request) {
  await connectDB();

  try {
    const { token, newPassword } = await request.json();

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as DecodedToken;
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { message: '유효하지 않은 요청입니다.' },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: '비밀번호가 변경되었습니다.' });
  } catch (error) {
    console.error('비밀번호 재설정 오류:', error);
    return NextResponse.json(
      { error: '비밀번호 재설정 오류' },
      { status: 500 }
    );
  }
}
