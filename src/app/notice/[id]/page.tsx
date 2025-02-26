'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DetailTable from '@/components/DetailTable';
import TitleBox from '@/components/TitleBox';

interface Notice {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [allNotices, setAllNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/get-notice');
        const data: Notice[] = await response.json();
        setAllNotices(data);
      } catch (error) {
        console.error('공지사항 목록 불러오기 실패:', error);
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await fetch(`/api/get-notice/${id}`);
        if (!response.ok) {
          throw new Error('공지사항 불러오기 실패');
        }

        const data: Notice = await response.json();
        setNotice(data);
      } catch (error) {
        console.error('공지사항 상세 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNoticeDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[40px]">
        Loading...
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="flex justify-center items-center h-screen text-[40px]">
        공지사항을 찾을 수 없습니다.
      </div>
    );
  }

  const currentIndex = allNotices.findIndex((item) => item._id === notice._id);

  const previousNotice = allNotices[currentIndex - 1];
  const nextNotice = allNotices[currentIndex + 1];

  return (
    <div>
      <TitleBox title="공지 사항" />
      <DetailTable
        title={notice.title}
        date={notice.createdAt}
        content={notice.content}
        previousPost={previousNotice}
        nextPost={nextNotice}
        onClick={() => {
          router.push('/notice');
        }}
        isNotice={true}
      />
    </div>
  );
}
