'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';

export default function AskDetailTable() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userData, setUserData] = useState<{
    name: string;
    userId: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        return;
      }

      try {
        const response = await fetch('/api/auth/get-token', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('유저 정보를 가져올 수 없습니다.');
        }

        const data = await response.json();

        setUserData({
          name: data.user.userName,
          userId: data.user.userId,
          date: new Date().toISOString().split('T')[0],
        });
      } catch (error) {
        console.error('에러 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    const token = await sessionStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('서버 오류가 발생했습니다.');
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
          {loading ? '로딩 중...' : userData?.name}
        </div>
      </div>

      <div className="h-[80px] flex border border-[#afafaf]">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          아이디
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          {loading ? '로딩 중...' : userData?.userId}
        </div>
      </div>

      <div className="h-[80px] flex border border-[#afafaf]">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          날짜
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          {loading ? '로딩 중...' : userData?.date}
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
    </div>
  );
}
