import { connectDB } from '../../../../../lib/db';
import { NextResponse } from 'next/server';
import Notice from '../../../../../models/Notice';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const notice = await Notice.findById(id);
    if (!notice) {
      return NextResponse.json(
        { message: '공지사항을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(notice, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json(
      { message: '공지사항 가져오는 중 오류 발생' },
      { status: 500 }
    );
  }
}
