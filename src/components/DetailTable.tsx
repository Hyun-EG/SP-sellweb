'use client';
import Button from './Button';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DetailTableProps {
  title: string;
  date: string;
  content: string;
  reply?: string;
  onClick?: () => void;
  isNotice?: boolean;
  previousPost?: Post | Notice | null;
  nextPost?: Post | Notice | null;
}

interface Post {
  _id: string;
  title: string;
  createdAt: string;
}

interface Notice {
  _id: string;
  title: string;
  createdAt: string;
}

export default function DetailTable({
  title,
  date,
  content,
  reply,
  onClick,
  isNotice = false,
}: DetailTableProps) {
  const path = usePathname();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts, setPosts] = useState<Post[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notices, setNotices] = useState<Notice[]>([]);
  const [previousPost, setPreviousPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [previousNotice, setPreviousNotice] = useState<Notice | null>(null);
  const [nextNotice, setNextNotice] = useState<Notice | null>(null);

  const currentId = path.split('/').pop();

  useEffect(() => {
    if (!isNotice) {
      const fetchPosts = async () => {
        try {
          const response = await fetch('/api/get-posts');
          if (!response.ok) {
            throw new Error('데이터를 가져올 수 없습니다.');
          }

          const data: Post[] = await response.json();
          setPosts(data);

          const currentIndex = data.findIndex((post) => post._id === currentId);
          if (currentIndex === -1) {
            return;
          }

          const prev = currentIndex > 0 ? data[currentIndex - 1] : null;
          setPreviousPost(prev);

          const next =
            currentIndex < data.length - 1 ? data[currentIndex + 1] : null;
          setNextPost(next);
        } catch (error) {
          console.error(error);
        }
      };

      if (currentId) {
        fetchPosts();
      }
    }
  }, [currentId, isNotice]);

  useEffect(() => {
    if (isNotice) {
      const fetchNotices = async () => {
        try {
          const response = await fetch('/api/get-notice');
          const data: Notice[] = await response.json();
          setNotices(data);

          const currentIndex = data.findIndex(
            (notice) => notice._id === currentId
          );
          if (currentIndex === -1) {
            return;
          }

          const prev = currentIndex > 0 ? data[currentIndex - 1] : null;
          setPreviousNotice(prev);

          const next =
            currentIndex < data.length - 1 ? data[currentIndex + 1] : null;
          setNextNotice(next);
        } catch (error) {
          console.error('공지사항 데이터를 가져올 수 없습니다.', error);
        }
      };

      if (currentId) {
        fetchNotices();
      }
    }
  }, [currentId, isNotice]);

  return (
    <div className="w-[1200px] h-screen flex flex-col">
      <div className="h-[120px] px-[20px] border-b border-[#afafaf] bg-[#f4f4f4]">
        <div className="h-[60px] flex justify-start items-center text-[24px] font-bold">
          {title}
        </div>
        <div className="h-[60px] flex justify-start">{date}</div>
      </div>
      <div className="h-[300px]">
        <div className="w-[1200px] h-[500px]">{content}</div>
      </div>

      {path.startsWith('/mypage/ask/') && !isNotice && (
        <div className="h-[200px] p-[20px] border border-b-0 border-[#afafaf]">
          <div className="font-bold mb-2">관리자 답변</div>
          <div>{reply || '아직 답변이 없습니다.'}</div>
        </div>
      )}

      <div className="h-[100px] border-y border-[#afafaf]">
        {isNotice ? (
          <>
            <div className="h-[50px] flex border-b border-[#afafaf]">
              <div className="w-[200px] flex justify-center items-center border-r border-[#afafaf]">
                이전글
              </div>
              <div
                className={`w-[1000px] flex justify-center items-center ${
                  previousNotice ? 'cursor-pointer' : ''
                }`}
                onClick={() =>
                  previousNotice && router.push(`/notice/${previousNotice._id}`)
                }
              >
                {previousNotice ? previousNotice.title : '이전글이 없습니다'}
              </div>
            </div>
            <div className="h-[50px] flex">
              <div className="w-[200px] flex justify-center items-center border-r border-[#afafaf]">
                다음글
              </div>
              <div
                className={`w-[1000px] flex justify-center items-center ${
                  nextNotice ? 'cursor-pointer' : ''
                }`}
                onClick={() =>
                  nextNotice && router.push(`/notice/${nextNotice._id}`)
                }
              >
                {nextNotice ? nextNotice.title : '다음글이 없습니다'}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-[50px] flex border-b border-[#afafaf]">
              <div className="w-[200px] flex justify-center items-center border-r border-[#afafaf]">
                이전글
              </div>
              <div
                className={`w-[1000px] flex justify-center items-center ${
                  previousPost ? 'cursor-pointer' : ''
                }`}
                onClick={() =>
                  previousPost && router.push(`/mypage/ask/${previousPost._id}`)
                }
              >
                {previousPost ? previousPost.title : '이전글이 없습니다'}
              </div>
            </div>
            <div className="h-[50px] flex">
              <div className="w-[200px] flex justify-center items-center border-r border-[#afafaf]">
                다음글
              </div>
              <div
                className={`w-[1000px] flex justify-center items-center ${
                  nextPost ? 'cursor-pointer' : ''
                }`}
                onClick={() =>
                  nextPost && router.push(`/mypage/ask/${nextPost._id}`)
                }
              >
                {nextPost ? nextPost.title : '다음글이 없습니다'}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="my-[20px] flex gap-[20px] justify-end">
        {path === '/mypage/ask/detail' && !isNotice ? (
          <Button
            theme="white"
            width={80}
            height={40}
            color="#fff"
            fontColor="#000"
            state="default"
          >
            삭제
          </Button>
        ) : null}
        <Button
          theme="white"
          width={80}
          height={40}
          color="#566270 "
          state="default"
          onClick={onClick}
        >
          목록
        </Button>
      </div>
    </div>
  );
}
