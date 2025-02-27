import { NextResponse } from 'next/server';
import User from '../../../../../models/User';
import { connectDB } from '../../../../../lib/db'; // DB 연결 함수

export const POST = async (req: Request) => {
  try {
    // DB 연결
    await connectDB();

    const { userName } = await req.json();

    // userName이 없으면 잘못된 요청 처리
    if (!userName) {
      return NextResponse.json(
        { message: '잘못된 요청입니다.' },
        { status: 400 }
      );
    }

    // DB에서 해당 유저 찾기
    const user = await User.findOne({ userId: userName });

    if (!user) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // refreshToken이 존재하면 삭제 처리
    if (user.refreshToken) {
      user.refreshToken = null;
      await user.save();
    }

    // 액세스 토큰 쿠키 삭제
    const response = NextResponse.json({ message: '로그아웃 성공' });

    // 액세스 토큰 쿠키 삭제
    response.cookies.delete({
      name: 'accessToken',
      path: '/',
    });

    // 리프레시 토큰 쿠키 삭제
    response.cookies.delete({
      name: 'refreshToken',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
    return NextResponse.json(
      { message: '로그아웃 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
};
