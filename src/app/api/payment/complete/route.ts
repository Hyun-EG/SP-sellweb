import { NextResponse } from 'next/server';
import { PortOneClient } from '@portone/server-sdk';
import { connectDB } from '../../../../../lib/db';
import Temp from '../../../../../models/Temp';

if (!process.env.V2_API_SECRET) {
  throw new Error('V2_API_SECRET environment variable is not defined');
}
const portone = PortOneClient({ secret: process.env.V2_API_SECRET });

async function syncPayment(paymentId: string) {
  try {
    const actualPayment = await portone.payment.getPayment({ paymentId });

    if (actualPayment.status !== 'PAID') {
      return false;
    }

    const isVerified = await verifyPayment(actualPayment);
    if (!isVerified) {
      return false;
    }

    return { status: 'PAID' };
  } catch (e) {
    console.error('결제 정보 불러오기 실패:', e);
    return false;
  }
}

interface Payment {
  customData?: string;
  orderName: string;
  amount: {
    total: number;
  };
  currency: string;
}

// 템플릿 DB와 비교하여 결제 검증
async function verifyPayment(payment: Payment) {
  if (!payment.customData) {
    return false;
  }

  const customData = JSON.parse(payment.customData);
  const templateId = customData.templateId;

  if (!templateId) {
    return false;
  }

  await connectDB();
  const template = await Temp.findById(templateId);
  if (!template) {
    return false;
  }

  return (
    payment.orderName === template.title &&
    payment.amount.total === template.priceInfo &&
    payment.currency === 'KRW'
  );
}

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json();
    if (typeof paymentId !== 'string') {
      return NextResponse.json(
        { message: '올바르지 않은 요청입니다.' },
        { status: 400 }
      );
    }

    const payment = await syncPayment(paymentId);
    if (!payment) {
      return NextResponse.json(
        { message: '결제 동기화에 실패했습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: payment.status }, { status: 200 });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json({ message: '서버 오류 발생' }, { status: 500 });
  }
}
