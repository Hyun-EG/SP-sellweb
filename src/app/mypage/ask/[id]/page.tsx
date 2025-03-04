'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import TitleBox from '@/components/TitleBox';
import DetailTable from '@/components/DetailTable';

interface PostDetail {
  title: string;
  content: string;
  createdAt: string;
  reply: string;
}

export default function AskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostDetail | null>(null);

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  return (
    <div>
      <TitleBox title="문의내역" />
      {post ? (
        <DetailTable
          title={post.title}
          date={post.createdAt}
          content={post.content}
          reply={post.reply}
          onClick={() => router.push(`/mypage/ask?page=${page}`)}
        />
      ) : (
        <p className="flex justify-center items-center h-screen text-[40px]">
          Loading...
        </p>
      )}
    </div>
  );
}
