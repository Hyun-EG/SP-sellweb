import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userName, email } = await req.json();
    const user = await User.findOne({ userName, email });

    if (!user) {
      return NextResponse.json(
        { message: '입력한 정보와 일치하는 계정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 아이디 반환 (마스킹 기능추가)
    const maskedUserId =
      user.userId.length > 8
        ? user.userId.slice(0, 8) + '*'.repeat(user.userId.length - 3)
        : user.userId;

    return NextResponse.json(
      { message: '아이디 찾기 성공', userId: maskedUserId },
      { status: 200 }
    );
  } catch (error) {
    console.error('아이디 찾기 중 오류 발생:', error);
    return NextResponse.json(
      {
        message: '서버 오류 발생',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
