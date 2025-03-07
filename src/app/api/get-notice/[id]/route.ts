import { connectDB } from '../../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server';
import Notice from '../../../../../models/Notice';

interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = context.params;

    const notice = await Notice.findById(id);
    if (!notice) {
      return NextResponse.json(
        { message: '공지사항을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(notice, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: '공지사항 가져오는 중 오류 발생' },
      { status: 500 }
    );
  }
}
