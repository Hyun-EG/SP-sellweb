import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Notice from '../../../../models/Notice';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: '제목과 내용을 입력하세요' },
        { status: 400 }
      );
    }

    const newNotice = new Notice({ title, content, createdAt: Date.now() });
    await newNotice.save();

    return NextResponse.json(
      { message: '공지사항이 추가되었습니다', notice: newNotice },
      { status: 201 }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json(
      { message: '공지사항 추가 중 오류 발생' },
      { status: 500 }
    );
  }
}
