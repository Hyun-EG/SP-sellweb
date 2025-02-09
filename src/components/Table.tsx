'use client';

import { useState } from 'react';

const items = [
  { title: '공지사항1', date: 20250209 },
  { title: '공지사항2', date: 20250209 },
  { title: '공지사항3', date: 20250209 },
  { title: '공지사항4', date: 20250209 },
  { title: '공지사항5', date: 20250209 },
  { title: '공지사항6', date: 20250209 },
  { title: '공지사항7', date: 20250209 },
  { title: '공지사항8', date: 20250209 },
  { title: '공지사항9', date: 20250209 },
  { title: '공지사항10', date: 20250209 },
  { title: '공지사항11', date: 20250209 },
  { title: '공지사항12', date: 20250209 },
  { title: '공지사항13', date: 20250209 },
  { title: '공지사항14', date: 20250209 },
];
const ITEMS_PER_PAGE = 10;

export default function Table() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const showItems = items.slice(startIndex, ITEMS_PER_PAGE + startIndex);

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[1200px] h-[100px] flex bg-[#F4F4F4] border-b border-[#afafaf]">
        <div className="w-[100px] flex justify-center items-center border-r border-[#afafaf]">
          번호
        </div>
        <div className="w-[900px] flex justify-center items-center border-r border-[#afafaf]">
          제목
        </div>
        <div className="w-[200px] flex justify-center items-center">
          등록 날짜
        </div>
      </div>
      {showItems.map((item, index) => (
        <div
          key={index}
          className="w-[1200px] h-[100px] flex border-b border-[#afafaf]"
        >
          <div className="w-[100px] flex justify-center items-center ">
            {startIndex + index + 1}
          </div>
          <div className="w-[900px] px-[20px] flex justify-start items-center ">
            {item.title}
          </div>
          <div className="w-[200px] flex justify-center items-center">
            {item.date}
          </div>
        </div>
      ))}
      <div className="flex gap-[10px] justify-center items-center my-[40px]">
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }}
          className="w-[40px] h-[40px] text-[24px] text-[#afafaf] border-[#afafaf] border"
        >
          &lt;
        </button>
        <div>{currentPage}</div>
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.min(prev + 1, totalItems));
          }}
          className="w-[40px] h-[40px] text-[24px] text-[#afafaf] border-[#afafaf] border"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
