'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import TitleBox from '@/components/TitleBox';

interface Post {
  userName: string;
  _id: string;
  title: string;
  createdAt: string;
}

export default function Page() {
  const [allRows, setAllRows] = useState<string[][]>([]);
  const [rowIds, setRowIds] = useState<string[]>([]);

  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get('page') || '1';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/get-posts');
        if (!response.ok) {
          throw new Error('데이터를 가져올 수 없습니다.');
        }
        const data: Post[] = await response.json();

        const formattedRows = data.map((post) => {
          const date = new Date(post.createdAt);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

          return [post.userName, post.title, formattedDate];
        });

        const ids = data.map((post) => post._id);

        setAllRows(formattedRows);
        setRowIds(ids);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="h-screen">
      <TitleBox title="문의내역" />
      {allRows.length === rowIds.length && (
        <Table
          headers={[
            { label: '이름', width: '100px' },
            { label: '제목', width: '900px' },
            { label: '등록 날짜', width: '200px' },
          ]}
          rows={allRows}
          rowIds={rowIds}
          link={`/mypage/ask`}
        />
      )}
    </div>
  );
}
