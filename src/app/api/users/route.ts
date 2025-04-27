import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import User from '../../../../models/User';

export async function GET() {
  await connectDB();

  const adminUsers = await User.find({
    userId: { $in: ['codiee', 'aro_jr'] },
  });

  return NextResponse.json(adminUsers, { status: 200 });
}
