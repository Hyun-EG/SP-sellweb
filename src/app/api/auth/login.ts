import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

async function checkPasswordMatch(
  userPassword: string,
  dbPassword: string
): Promise<boolean> {
  return bcrypt.compare(userPassword, dbPassword);
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
      { status: 400 }
    );
  }

  const isPasswordCorrect = await checkPasswordMatch(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: '이메일 또는 비밀번호가 일치하지 않습니다.' },
      { status: 400 }
    );
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: '1h',
    }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: '7d',
    }
  );

  //리프레시토큰 보안을 위해 로컬스토리지 또는 HTTP-Only 쿠키를 알아봅시다 프론트엔드 재원쿤 - 백엔드 박성현

  return NextResponse.json({ accessToken, refreshToken });
}
