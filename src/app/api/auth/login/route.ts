import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';

export const generateAccessToken = (userId: string, userName: string) => {
  return jwt.sign({ userId, userName }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '1h', // 1시간 만료
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '7d', // 7일 만료
  });
};

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

    // 3. 액세스 토큰과 리프레시 토큰 생성
    const accessToken = generateAccessToken(user.userId, user.userName);
    const refreshToken = generateRefreshToken(user.userId);

    // 4. 리프레시 토큰을 DB에 저장
    user.refreshToken = refreshToken;
    await user.save();

    // 5. 응답 객체 준비
    const response = NextResponse.json(
      { message: '로그인 성공', userName: user.userName },
      { status: 200 }
    );

    // 액세스 토큰을 HttpOnly 쿠키로 설정
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true, // 클라이언트에서 JavaScript로 접근 불가
      secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 https에만 설정
      sameSite: 'strict', // CSRF 공격 방지
      maxAge: 60 * 60, // 1시간 유효
      path: '/', // 모든 경로에서 접근 가능
    });

    // 리프레시 토큰을 HttpOnly 쿠키로 설정
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true, // 클라이언트에서 JavaScript로 접근 불가
      secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 https에만 설정
      sameSite: 'strict', // CSRF 공격 방지
      maxAge: 7 * 24 * 60 * 60, // 7일 유효
      path: '/', // 모든 경로에서 접근 가능
    });

    return response;
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
