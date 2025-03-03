import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Verification from '../../../../../models/Verification';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    // 이메일로 인증번호 검색
    const verification = await Verification.findOne({ email });
    if (!verification) {
      return NextResponse.json({ message: '인증 정보 없음' }, { status: 400 });
    }

    // 인증번호 비교
    const isMatch = await bcrypt.compare(code, verification.code);
    if (!isMatch) {
      return NextResponse.json({ message: '인증번호 불일치' }, { status: 400 });
    }

    return NextResponse.json({ message: '인증 성공' });
  } catch (error) {
    console.error('인증번호 확인 중 오류 발생:', error);
    return NextResponse.json(
      {
        message: '서버 오류',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
