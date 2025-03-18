import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Chat from '../../../../../models/Chat';

export async function GET() {
  await connectDB();

  const recentChats = await Chat.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $match: {
        reciever: { $in: ['codiee', 'aro_jr'] },
      },
    },
    {
      $group: {
        _id: '$userId',
        userName: { $first: '$userName' },
        lastMessage: { $first: '$message' },
        createdAt: { $first: '$createdAt' },
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  return NextResponse.json(recentChats, { status: 200 });
}
