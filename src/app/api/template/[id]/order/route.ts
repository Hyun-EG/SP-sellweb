import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../../lib/db';
import Temp from '../../../../../../models/Temp';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const templateId = params?.id;
    if (!templateId) {
      return NextResponse.json(
        { error: '템플릿 ID가 없습니다.' },
        { status: 400 }
      );
    }

    // 템플릿 찾기
    const template = await Temp.findById(templateId);
    if (!template) {
      return NextResponse.json(
        { error: '템플릿을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 판매 수 증가
    template.sellingCount = (Number(template.sellingCount) || 0) + 1;
    await template.save();

    return NextResponse.json({ sellingCount: template.sellingCount });
  } catch (error) {
    console.error('판매 수 증가 실패:', error);
    return NextResponse.json({ error: '판매 수 증가 실패' }, { status: 500 });
  }
}
