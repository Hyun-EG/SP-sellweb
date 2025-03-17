import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import AdBox from '../../../../models/AdBox';

export async function GET() {
  try {
    await connectDB();
    const ads = await AdBox.find().sort({ _id: -1 });

    return NextResponse.json(ads, { status: 200 });
  } catch (err) {
    console.error('광고 불러오기 실패:', err);
    return NextResponse.json(
      { message: '광고 불러오기 실패' },
      { status: 500 }
    );
  }
}
