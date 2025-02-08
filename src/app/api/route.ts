import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongo';

export async function connectState() {
  try {
    await connectDB();
    return NextResponse.json({ message: 'DB 연결 성공' }, { status: 200 });
  } catch (error) {
    console.error('DB 연결 실패', error);
    return NextResponse.json({ error: 'DB 연결 실패' }, { status: 500 });
  }
}
