'use client';

import DetailTable from '@/components/DetailTable';
import TitleBox from '@/components/TitleBox';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface PostType {
  title: string;
  content: string;
  createdAt: string;
}

export default function Page() {
  const [post, setPost] = useState<PostType | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`/api/get-posts/${id}`);
        if (!response.ok) {
          throw new Error('데이터를 불러오지 못했습니다.');
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('데이터 불러오다가 에러남', error);
      }
    };

    if (id) {
      getPost();
    }
  }, [id]);

  return (
    <div>
      <TitleBox title="문의내역" />
      {post ? (
        <DetailTable
          title={post.title}
          date={post.createdAt}
          content={post.content}
        />
      ) : (
        <p className="flex justify-center items-center h-screen text-[40px]">
          Loading...
        </p>
      )}
    </div>
  );
}
