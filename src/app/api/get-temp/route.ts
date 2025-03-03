import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Temp from '../../../../models/Temp';

export async function GET() {
  await connectDB();

  try {
    const temps = await Temp.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: temps });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '데이터 불러오기 실패',
      error,
    });
  }
}
