import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Notice from '../../../../models/Notice';

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'ID가 필요합니다' }, { status: 400 });
    }
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return NextResponse.json(
        { message: '공지사항을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: '공지사항이 삭제되었습니다' },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ message: '삭제 중 오류 발생' }, { status: 500 });
  }
}
