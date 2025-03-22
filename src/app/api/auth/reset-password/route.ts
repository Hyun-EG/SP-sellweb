import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';

export async function POST(req: Request) {
  try {
    // DB 연결
    await connectDB();

    // 요청 데이터 가져오기
    const { userId, email, newPassword } = await req.json();

    // 필수 값 확인
    if (!userId || !email || !newPassword) {
      return NextResponse.json(
        { message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 해당 유저가 존재하는지 확인
    const user = await User.findOne({ userId, email });

    if (!user) {
      return NextResponse.json(
        { message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 새 비밀번호 해싱 (암호화)
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // DB에 새 비밀번호 업데이트
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    return NextResponse.json(
      { message: '비밀번호가 성공적으로 변경되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('비밀번호 변경 중 오류 발생:', error);

    return NextResponse.json(
      {
        message: '서버 오류',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
