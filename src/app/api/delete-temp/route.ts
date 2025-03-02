import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Temp from '../../../../models/Temp';

export async function DELETE(req: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID 누락' });
    }

    await Temp.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: '삭제 실패', error });
  }
}
