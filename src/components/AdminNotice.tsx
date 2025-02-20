'use client';

import { useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import Link from 'next/link';

export default function AdminNotice() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notices, setNotices] = useState<
    { _id: string; title: string; date: string }[]
  >([]);

  const handleAddNotice = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력하세요.');
      return;
    }

    try {
      const response = await fetch('/api/add-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('공지사항이 추가되었습니다.');
        setTitle('');
        setContent('');
        fetchNotices();
      } else {
        alert('공지사항 추가 실패');
      }
    } catch (err) {
      console.error(err);
      alert('오류 발생');
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/get-notice');
      if (response.ok) {
        const data = await response.json();
        setNotices(data);
      } else {
        console.error('공지사항 불러오기 실패');
      }
    } catch (err) {
      console.error('오류 발생', err);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      const response = await fetch('/api/delete-notice', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert('공지사항이 삭제되었습니다.');
        setNotices(notices.filter((notice) => notice._id !== id));
      } else {
        alert('삭제 실패');
      }
    } catch (err) {
      console.error('삭제 오류 발생', err);
      alert('삭제 중 오류 발생');
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="w-full flex flex-col py-[10px] ">
      <div className="w-[80%] flex gap-[5px] pb-[10px] border-b border-[#afafaf]">
        <Input
          placeholder="공지사항 제목을 입력해주세요"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          width={240}
          height={50}
        />
        <Input
          placeholder="공지사항 내용을 입력해주세요"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          width={240}
          height={50}
        />
        <Button onClick={handleAddNotice} theme="white" width={100} height={50}>
          추가
        </Button>
      </div>

      <div className="w-full h-full flex flex-col">
        {notices.slice(0, 5).map((item, index) => (
          <div
            key={item._id}
            className="w-[80%] h-[50px] flex items-center gap-[15px] border-b border-[#afafaf]"
          >
            <div className="w-[10%] flex justify-center">{index + 1}</div>
            <div className="w-[60%]">{item.title}</div>
            <div className="w-[20%]">{item.date}</div>
            <div
              className="w-[10%] cursor-pointer"
              onClick={() => handleDeleteNotice(item._id)}
            >
              삭제
            </div>
          </div>
        ))}
        <div>
          <div className="w-[80%] p-[10px] flex justify-end">
            <Link href="/notice">
              <span className="text-[14px] font-bold cursor-pointer">
                공지사항 더보기
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
