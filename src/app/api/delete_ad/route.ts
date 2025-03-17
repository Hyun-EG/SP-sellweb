import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import AdBox from '../../../../models/AdBox';

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: '광고 ID가 필요합니다' },
        { status: 400 }
      );
    }

    const deletedAd = await AdBox.findByIdAndDelete(id);

    if (!deletedAd) {
      return NextResponse.json(
        { message: '광고를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: '광고가 삭제되었습니다' },
      { status: 200 }
    );
  } catch (err) {
    console.error('광고 삭제 중 오류 발생:', err);
    return NextResponse.json({ message: '삭제 중 오류 발생' }, { status: 500 });
  }
}
