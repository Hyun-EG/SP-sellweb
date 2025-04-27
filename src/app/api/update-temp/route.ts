import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Temp from '../../../../models/Temp';

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { id, title, description, service, priceInfo, imageUrls } = body;

    const updatedTemp = await Temp.findByIdAndUpdate(
      id,
      { title, description, service, priceInfo, imageUrls },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedTemp });
  } catch (error) {
    return NextResponse.json({ success: false, message: '수정 실패', error });
  }
}
