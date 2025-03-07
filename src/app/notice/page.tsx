'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import TitleBox from '@/components/TitleBox';

// eslint-disable-next-line no-unused-vars
interface Notice {
  _id: string;
  title: string;
  createdAt: string;
}

export default function Notice() {
  const [allRows, setAllRows] = useState<string[][]>([]);
  const [rowIds, setRowIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/get-notice');
        const data: Notice[] = await response.json();
        const formattedRows = data.map((item, index) => {
          const date = new Date(item.createdAt);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

          return [String(index + 1), item.title, formattedDate];
        });

        const ids = data.map((item) => item._id);

        setAllRows(formattedRows);
        setRowIds(ids);
      } catch (error) {
        console.error('공지사항 가져오기 실패', error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="h-full">
      <TitleBox title="공지사항" />
      <Table
        headers={[
          { label: '번호', width: '100px' },
          { label: '제목', width: '900px' },
          { label: '등록 날짜', width: '200px' },
        ]}
        rows={allRows}
        rowIds={rowIds}
        link="/notice"
      />
    </div>
  );
}
