import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '../../../../../lib/db';
import Payment from '../../../../../models/Payment';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { amount, userId, method, buyer_email, buyer_name, buyer_tel } = body;

    if (!amount || !userId || !method) {
      return NextResponse.json(
        { message: '필수 결제 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 고유한 주문 ID 생성
    const orderId = `order_${uuidv4()}`;

    await connectDB();

    const newPayment = new Payment({
      orderId,
      userId,
      amount,
      method,
      buyer_email,
      buyer_name,
      buyer_tel,
      status: 'pending', // 초기 상태: 대기중
    });

    await newPayment.save();

    return NextResponse.json(
      {
        message: '결제 요청이 성공적으로 생성되었습니다.',
        orderId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('결제 요청 API 오류:', error);
    return NextResponse.json(
      { message: '결제 요청 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
