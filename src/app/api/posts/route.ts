import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Post from '../../../../models/Post';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';

interface SessionUser {
  userId: string;
  name: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = (await getServerSession(authOptions)) as {
      user: SessionUser | null;
    };

    if (!session || !session.user) {
      return NextResponse.json(
        { message: '로그인이 필요합니다.' },
        { status: 401 }
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
      userId: session.user.userId,
      userName: session.user.name,
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
    return NextResponse.json({ message: '서버 오류 발생' }, { status: 500 });
  }
}
