import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';

export async function POST(req: Request) {
  try {
    const { userId, email, verificationCode } = await req.json();

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

    // 인증번호 검증 (DB 또는 캐시에서 비교 필요)
    const isValidCode = verificationCode === 'expectedCode'; // 실제로 DB 또는 메모리 캐시에서 인증번호와 비교하는 로직 필요
    if (!isValidCode) {
      return NextResponse.json(
        { message: '인증번호가 올바르지 않습니다.' },
        { status: 400 }
      );
    }

    // 인증번호 검증 성공 시, 비밀번호 변경 가능

    return NextResponse.json(
      { message: '인증 성공! 새 비밀번호를 설정하세요.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('인증번호 검증 중 오류 발생:', error);
    return NextResponse.json(
      {
        message: '서버 오류',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
