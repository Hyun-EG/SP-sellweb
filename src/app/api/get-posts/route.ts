import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Post from '../../../../models/Post';

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find({}).select('title createdAt');

    const formattedPosts = posts.map((post) => ({
      title: post.title,
      createdAt: post.createdAt.toISOString().split('T')[0],
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
