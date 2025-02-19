import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Notice from '../../../../../models/Notice';

export async function GET() {
  try {
    await connectDB();
    const notices = await Notice.find().sort({ _id: -1 });

    return NextResponse.json(notices, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json(
      { message: '공지사항 불러오기 실패' },
      { status: 500 }
    );
  }
}
