import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Chat from '../../../../models/Chat';
import User from '../../../../models/User';

export async function POST(req: Request) {
  await connectDB();
  const { userId, userName, reciever, message } = await req.json();

  if (!userId || !reciever || !message) {
    return NextResponse.json(
      { error: '모든 필드를 입력하세요.' },
      { status: 400 }
    );
  }

  const adminUsers = await User.find({
    userId: { $in: ['codiee', 'aro_jr'] },
  });

  const adminUserIds = adminUsers.map((admin) => admin.userId);

  if (!adminUserIds.includes(reciever) && !adminUserIds.includes(userId)) {
    return NextResponse.json(
      { error: '일반 유저는 관리자에게만 메시지를 보낼 수 있습니다.' },
      { status: 403 }
    );
  }

  const chat = await Chat.create({ userId, userName, reciever, message });

  return NextResponse.json(chat, { status: 201 });
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const reciever = searchParams.get('reciever');

  if (!userId || !reciever) {
    return NextResponse.json(
      { error: 'userId와 reciever가 필요합니다.' },
      { status: 400 }
    );
  }

  const chats = await Chat.find({
    $or: [
      { userId, reciever },
      { userId: reciever, reciever: userId },
    ],
  }).sort({ createdAt: 1 });

  return NextResponse.json(chats, { status: 200 });
}
