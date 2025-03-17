import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import AdBox from '../../../../models/AdBox';

// 광고 불러오기
export async function GET() {
  try {
    await connectDB();
    const ads = await AdBox.find().sort({ createdAt: -1 }); // 최신 광고 먼저 가져오기
    return NextResponse.json({ ads }, { status: 200 });
  } catch (err) {
    console.error('광고 불러오기 오류:', err);
    return NextResponse.json(
      { message: '광고를 불러오는 중 오류 발생' },
      { status: 500 }
    );
  }
}

// 광고 추가하기
export async function POST(req: Request) {
  try {
    await connectDB();
    const { content } = await req.json();
    if (!content) {
      return NextResponse.json(
        { message: '광고 내용을 입력해주세요' },
        { status: 400 }
      );
    }

    const newAdBox = new AdBox({ content });
    await newAdBox.save();

    return NextResponse.json(
      { message: '광고가 추가되었습니다', adBox: newAdBox },
      { status: 201 }
    );
  } catch (err) {
    console.error('광고 추가 중 오류 발생:', err);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
