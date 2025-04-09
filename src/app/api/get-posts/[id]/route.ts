import { NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';
import Post from '../../../../../models/Post';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();

    const post = await Post.findById(params.id);

    if (!post) {
      return NextResponse.error();
    }

    const formattedPost = {
      userName: post.userName,
      title: post.title,
      createdAt: post.createdAt.toISOString().split('T')[0],
      content: post.content,
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
