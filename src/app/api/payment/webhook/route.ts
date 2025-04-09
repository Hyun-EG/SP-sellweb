import { NextResponse } from 'next/server';
import { Webhook } from '@portone/server-sdk';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headers = Object.fromEntries(req.headers);

    let webhook;
    try {
      webhook = await Webhook.verify(
        process.env.V2_WEBHOOK_SECRET!,
        body,
        headers
      );
    } catch (e) {
      if (
        e instanceof Error &&
        e.message.includes('Webhook verification failed')
      ) {
        return NextResponse.json(
          { message: '웹훅 검증 실패' },
          { status: 400 }
        );
      }
      throw e;
    }

    if ('data' in webhook && 'paymentId' in webhook.data) {
      await syncPayment(webhook.data.paymentId);
    }

    return new NextResponse(null, { status: 200 });
  } catch {
    return NextResponse.json({ message: '서버 오류 발생' }, { status: 500 });
  }
}
async function syncPayment(paymentId: string) {
  const paymentStatus = 'completed';
  const updated = await updatePaymentStatusInDatabase(paymentId, paymentStatus);

  if (!updated) {
    throw new Error(`Failed to sync payment with ID: ${paymentId}`);
  }
}

// Mock function to simulate database update
async function updatePaymentStatusInDatabase(
  _paymentId: string,
  _status: string
): Promise<boolean> {
  // eslint-disable-next-line no-console
  console.log(`Updating payment ID: ${_paymentId} with status: ${_status}`);
  return true;
}
