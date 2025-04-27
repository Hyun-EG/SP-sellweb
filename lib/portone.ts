'use client';

import PortOne from '@portone/browser-sdk/v2';

export interface PaymentData {
  amount: number;
  orderId: string;
  userId: string;
  method: 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER' | 'MOBILE' | 'EASY_PAY';
  buyer_email?: string;
  buyer_name?: string;
  buyer_tel?: string;
  templateId: string;
}

export const requestPayment = async (
  paymentData: PaymentData,
  onSuccess?: (_success: boolean) => void
): Promise<void> => {
  try {
    const payment = await PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
      channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
      paymentId: paymentData.orderId,
      orderName: '상품 결제',
      totalAmount: paymentData.amount,
      currency: 'CURRENCY_KRW',
      payMethod: paymentData.method as
        | 'CARD'
        | 'VIRTUAL_ACCOUNT'
        | 'TRANSFER'
        | 'MOBILE'
        | 'EASY_PAY',
      customData: {
        userId: paymentData.userId,
        templateId: paymentData.templateId,
      },
      customer: {
        email: paymentData.buyer_email,
      },
      popup: {},
    });

    if (payment?.code !== undefined) {
      alert(`결제 실패: ${payment.message}`);
      onSuccess?.(false);
      return;
    }

    // 서버에 결제 완료 검증 요청
    const res = await fetch('/api/payment/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: paymentData.orderId }),
    });

    if (!res.ok) {
      alert('결제 검증 실패');
      onSuccess?.(false);
      return;
    }

    alert('결제 성공!');
    onSuccess?.(true);
  } catch (error) {
    console.error('결제 요청 오류:', error);
    alert('결제 요청 중 오류가 발생했습니다.');
    onSuccess?.(false);
  }
};

export default requestPayment;
