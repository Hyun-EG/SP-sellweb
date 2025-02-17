'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import TitleBox from '@/components/TitleBox';

export default function Page() {
  const [rows, setRows] = useState<
    Array<{ _id: string; title: string; createdAt: string }>
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/get-posts');
        if (!response.ok) {
          throw new Error('데이터를 가져올 수 없습니다.');
        }
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedRows = data.map((post: any) => ({
          _id: post._id,
          title: post.title,
          createdAt: post.createdAt,
        }));

        setRows(formattedRows);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="h-screen">
      <TitleBox title="문의내역" />
      <Table
        headers={[
          { label: '번호', width: '100px' },
          { label: '제목', width: '900px' },
          { label: '등록 날짜', width: '200px' },
        ]}
        rows={rows.map((row, index) => [
          (index + 1).toString(),
          row.title,
          row.createdAt,
        ])}
        link="/mypage/ask/detail"
      />
    </div>
  );
}
