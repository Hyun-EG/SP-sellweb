import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const serviceSid = process.env.TWILIO_SERVICE_SID!;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { phoneNumber, otp } = await request.json();

    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: otp });

    return NextResponse.json({ status: verificationCheck.status });
  } catch (error) {
    console.error('Twilio 인증번호 확인 오류:', error);
    return NextResponse.json({ error: '인증번호 확인 실패' }, { status: 500 });
  }
}
