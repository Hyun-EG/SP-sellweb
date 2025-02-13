import { NextResponse } from 'next/server';
import User from '../../../../../models/User';
import { connectDB } from '../../../../../lib/db';

// POST 요청 처리
export async function POST(req: Request) {
  try {
    // DB 연결
    await connectDB();

    // 요청에서 데이터 받기
    const { userName, userId, password, email } = await req.json();

    // 새로운 사용자 객체 생성
    const newUser = new User({
      userName,
      userId,
      password,
      email,
    });

    // DB에 사용자 저장
    await newUser.save();

    // 성공 응답 반환
    return NextResponse.json({ message: '회원가입 성공!' }, { status: 201 });
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return NextResponse.json(
      { message: '서버 오류', error: error },
      { status: 500 }
    );
  }
}
