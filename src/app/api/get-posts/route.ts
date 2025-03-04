import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Post from '../../../../models/Post';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const showUnanswered = searchParams.get('unanswered') === 'true';

    const filter = showUnanswered ? { reply: { $exists: false } } : {};

    const posts = await Post.find(filter)
      .select('title createdAt userName _id reply')
      .sort({ createdAt: 1 });

    const formattedPosts = posts.map((post) => ({
      _id: post._id.toString(),
      userName: post.userName,
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
