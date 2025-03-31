import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Post from '../../../../models/Post';

interface Filter {
  userName?: string;
  reply?: string;
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const showUnanswered = searchParams.get('unanswered') === 'true';

    const filter: Filter = {};

    if (user) {
      filter.userName = user;
    }

    if (showUnanswered) {
      filter.reply = '';
    }

    const posts = await Post.find(filter)
      .select('title createdAt userName _id reply userId')
      .sort({ createdAt: 1 });

    const formattedPosts = posts.map((post) => ({
      _id: post._id.toString(),
      userName: post.userName,
      userId: post.userId,
      title: post.title,
      createdAt: post.createdAt.toISOString().split('T')[0],
      answer: post.reply || null,
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
