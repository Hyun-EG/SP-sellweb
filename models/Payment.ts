import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // 주문 번호 (UUID)
    userId: { type: String, required: true }, // 결제한 사용자 ID
    amount: { type: Number, required: true }, // 결제 금액
    method: { type: String, required: true }, // 결제 방법 (카드, 카카오페이 등)
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    }, // 결제 상태
    buyer_email: { type: String }, // 구매자 이메일
    buyer_name: { type: String }, // 구매자 이름
    buyer_tel: { type: String }, // 구매자 전화번호
  },
  { timestamps: true } // createdAt, updatedAt 자동 관리
);

// 기존 모델이 있으면 사용하고, 없으면 새로 생성
export default mongoose.models.Payment ||
  mongoose.model('Payment', PaymentSchema);
