import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Post from '../../../../models/Post';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: '토큰이 없습니다.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET 환경 변수가 필요합니다.');
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!decoded?.userId) {
      return NextResponse.json(
        { message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    const user = await User.findOne({ userId: decoded.userId });
    if (!user) {
      return NextResponse.json(
        { message: '유저를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { message: '제목과 내용을 입력하세요.' },
        { status: 400 }
      );
    }

    const newPost = new Post({
      userId: user.userId,
      userName: user.userName,
      title,
      content,
      createdAt: new Date(),
    });

    await newPost.save();

    return NextResponse.json(
      { message: '게시글이 저장되었습니다.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('게시글 저장 오류:', error);
    return NextResponse.json({ message: '서버 오류', error }, { status: 500 });
  }
}
