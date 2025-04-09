export type PaymentRequest = {
  amount: number;
  orderId: string;
  userId: string;
  method: 'card' | 'kakao' | 'naver' | 'tosspay' | 'phone';
};

export type PaymentResponse = {
  success: boolean;
  transactionId: string;
  orderId: string;
  message?: string;
};

export type PaymentWebhookPayload = {
  imp_uid: string;
  merchant_uid: string;
  status: 'paid' | 'failed' | 'cancelled';
};
