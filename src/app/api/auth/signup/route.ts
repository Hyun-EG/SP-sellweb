import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import signupUser from '../../../../../services/signupService';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { userName, userId, password, email, confirmPassword, provider } =
      await req.json();

    // 입력값 검증
    if (!userName) {
      return NextResponse.json(
        { message: '이름을 입력해주세요.' },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { message: '아이디를 입력해주세요.' },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: '비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { message: '이메일을 입력해주세요.' },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: '비밀번호가 서로 다릅니다.' },
        { status: 400 }
      );
    }

    // 회원가입 처리
    try {
      const user = await signupUser(
        userName,
        userId,
        email,
        password,
        confirmPassword,
        provider
      );
      return NextResponse.json(
        { message: '회원가입 성공!', user },
        { status: 201 }
      );
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      return NextResponse.json(
        {
          message: '회원가입 실패',
          error: error instanceof Error ? error.message : error,
        },
        { status: 500 }
      );
    }
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
