import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const serviceSid = process.env.TWILIO_SERVICE_SID!;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });

    return NextResponse.json({ status: verification.status });
  } catch (error) {
    console.error('Twilio 인증번호 전송 오류:', error);
    return NextResponse.json({ error: '인증번호 전송 실패' }, { status: 500 });
  }
}
