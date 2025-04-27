import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Temp from '../../../../../models/Temp';

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  await connectDB();

  try {
    const template = await Temp.findById(params.id);
    if (!template) {
      return NextResponse.json(
        { error: '템플릿을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return NextResponse.json(template);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '데이터 불러오기 실패' },
      { status: 500 }
    );
  }
}
