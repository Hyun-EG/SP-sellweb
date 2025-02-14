import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';

export async function POST(req: Request) {
  try {
    // DB 연결
    await connectDB();

    // 환경 변수 확인
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다.');
    }

    // 요청 데이터 가져오기
    const { userId, password } = await req.json();

    // 1. 아이디로 유저 찾기
    const user = await User.findOne({ userId });
    if (!user) {
      return NextResponse.json(
        { message: '존재하지 않는 아이디입니다.' },
        { status: 401 }
      );
    }

    // 2. 비밀번호 검증
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: '비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }

    // 3. JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.userId, userName: user.userName },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json(
      { message: '로그인 성공', token, userName: user.userName },
      { status: 200 }
    );
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);

    return NextResponse.json(
      {
        message: '서버 오류',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
