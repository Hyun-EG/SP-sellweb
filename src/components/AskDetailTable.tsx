'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import { useSession } from 'next-auth/react';
import AlertModal from './AlertModal';
import { useRouter } from 'next/navigation';

export default function AskDetailTable() {
  const { data: session, status } = useSession();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userData, setUserData] = useState<{
    name: string;
    userId: string;
    date: string;
  } | null>(null);

  const [isShowAlert, setIsShowAlert] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setUserData({
        name: session.user.name,
        userId: session.user.userId,
        date: new Date().toISOString().split('T')[0],
      });
    } else {
      setIsShowAlert(true);
    }

    return () => {
      setIsShowAlert(false);
    };
  }, [session, isShowAlert]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert('게시글이 등록되었습니다.');
      setTitle('');
      setContent('');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <div className="h-[80px] flex items-center">
        필요하신 문의를 남겨주세요. 빠른 시일 내에 답변 드리겠습니다.
      </div>

      <div className="h-[80px] flex border border-[#afafaf]">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          이름
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          {status === 'loading' ? '로딩 중...' : userData?.name}
        </div>
      </div>

      <div className="h-[80px] flex border border-[#afafaf]">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          아이디
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          {status === 'loading' ? '로딩 중...' : userData?.userId}
        </div>
      </div>

      <div className="h-[80px] flex border border-[#afafaf]">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          날짜
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          {status === 'loading' ? '로딩 중...' : userData?.date}
        </div>
      </div>

      <div className="h-[80px] flex border border-[#afafaf]">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          제목
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          <Input
            width={1010}
            height={40}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[80px] flex border border-[#afafaf]">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          내용
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          <Input
            width={1010}
            height={40}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="h-[120px] flex justify-end items-center gap-[10px]">
        <Button width={80} height={40} theme="white" onClick={handleSubmit}>
          등록
        </Button>
        <Button
          width={80}
          height={40}
          theme="white"
          color="white"
          fontColor="black"
        >
          취소
        </Button>
      </div>
      {isShowAlert && (
        <AlertModal
          title="로그인이 필요합니다."
          content="계속하려면 로그인이 필요합니다."
          btnName="확인"
          onClick={() => {
            router.push('/');
          }}
        />
      )}
    </div>
  );
}
