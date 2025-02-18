import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';
import Verification from '../../../../../models/Verification';

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

    // DB에서 인증번호 찾기
    const verification = await Verification.findOne({ email });
    if (!verification) {
      return NextResponse.json(
        { message: '인증번호가 만료되었거나 존재하지 않습니다.' },
        { status: 400 }
      );
    }

    // 입력한 인증번호와 해싱된 인증번호 비교
    const isValidCode = await bcrypt.compare(
      verificationCode,
      verification.code
    );
    if (!isValidCode) {
      return NextResponse.json(
        { message: '인증번호가 올바르지 않습니다.' },
        { status: 400 }
      );
    }

    // 인증 성공 시, 인증번호 삭제 (보안 강화)
    await Verification.deleteOne({ email });

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
