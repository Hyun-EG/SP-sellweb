'use client';

import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Link from 'next/link';

const data = [
  { noticeTitle: '공지제목', date: '2024.05.01' },
  { noticeTitle: '공지제목', date: '2024.05.01' },
  { noticeTitle: '공지제목', date: '2024.05.01' },
  { noticeTitle: '공지제목', date: '2024.05.01' },
  { noticeTitle: '공지제목', date: '2024.05.01' },
  { noticeTitle: '공지제목', date: '2024.05.01' },
  { noticeTitle: '공지제목', date: '2024.05.01' },
  { noticeTitle: '공지제목', date: '2024.05.01' },
];

export default function AdminNotice() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const arr = data.slice(0, 5);
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
        <Button theme="white" width={100} height={50}>
          추가
        </Button>
      </div>

      <div className="w-full h-full flex flex-col">
        {arr.map((item, index) => (
          <div
            key={index}
            className="w-[80%] h-[50px] flex items-center gap-[15px] border-b border-[#afafaf]"
          >
            <div className="w-[10%] flex justify-center">{index + 1}</div>
            <div className="w-[60%]">{item.noticeTitle}</div>
            <div className="w-[20%]">{item.date}</div>
            <div className="w-[10%] ">삭제</div>
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
