import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Post from '../../../../models/Post';

interface PostFilter {
  userName: string | null;
  reply?: { $exists: boolean };
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const showUnanswered = searchParams.get('unanswered') === 'true';

    const filter: PostFilter = { userName: user };
    if (showUnanswered) {
      filter.reply = { $exists: false };
    } else {
      const posts = await Post.find({ userName: user, reply: { $ne: '' } })
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
    }

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
