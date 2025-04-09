'use client';

import PortOne from '@portone/browser-sdk/v2';
import Button from './Button';

interface PaymentProps {
  id: string;
  title: string;
  priceInfo: number;
  onSuccess?: () => void;
  onOrderSuccess?: () => void;
}

const Payment = ({
  id,
  title,
  priceInfo,
  onSuccess,
  onOrderSuccess,
}: PaymentProps) => {
  const handlePayment = async () => {
    if (!priceInfo || isNaN(priceInfo)) {
      alert('결제 금액이 잘못되었습니다. 다시 시도해주세요.');
      return;
    }

    try {
      const paymentId = crypto.randomUUID();

      const payment = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId,
        orderName: title,
        totalAmount: priceInfo,
        currency: 'CURRENCY_KRW',
        payMethod: 'CARD',
        customData: { templateId: id },
        popup: {},
      });

      if (payment?.code !== undefined) {
        alert(`결제 실패: ${payment.message}`);
        return;
      }

      const completeResponse = await fetch('/api/payment/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      });

      if (completeResponse.ok) {
        alert('결제 성공!');
        onSuccess?.();
        onOrderSuccess?.();
      } else {
        alert('결제 실패');
      }
    } catch (error) {
      console.error('결제 요청 실패:', error);
      alert('결제 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <Button theme="white" width={400} height={40} onClick={handlePayment}>
      결제하기
    </Button>
  );
};

export default Payment;
