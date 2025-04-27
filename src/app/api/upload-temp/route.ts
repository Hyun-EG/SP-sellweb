import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Temp from '../../../../models/Temp';

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { title, description, service, priceInfo, imageUrls } = body;

    const newTemp = await Temp.create({
      title,
      description,
      service,
      priceInfo,
      imageUrls: imageUrls || [],
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: newTemp });
  } catch (error) {
    return NextResponse.json({ success: false, message: '등록 실패', error });
  }
}
