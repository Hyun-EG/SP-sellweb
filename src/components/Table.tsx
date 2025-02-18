'use client';

import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Table({
  headers,
  rows,
  link,
}: {
  headers: { label: string; width: string }[];
  rows: string[][];
  link: string;
}) {
  const [curPageShowData, setCurPageShowData] = useState<string[][]>([]);

  const param = usePathname();

  useEffect(() => {
    setCurPageShowData(rows);
  }, [rows]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[70px] flex border-b border-[#afafaf] bg-[#f4f4f4]">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`flex justify-center items-center ${index !== headers.length - 1 ? 'border-r border-[#afafaf]' : ''}`}
            style={{ width: header.width }}
          >
            {header.label}
          </div>
        ))}
      </div>
      {curPageShowData.map((row, index) => (
        <div key={index} className="h-[60px] flex border-b border-[#afafaf]">
          {row.map((cell, index) => (
            <div
              key={index}
              className="flex justify-center items-center"
              style={{ width: headers[index]?.width }}
            >
              <Link href={`${link}/${row[0]}`}>{cell}</Link>
            </div>
          ))}
        </div>
      ))}
      {param !== '/mypage/bought/detail' && param !== '/admin' ? (
        <Pagination data={rows} setCurPageShowData={setCurPageShowData} />
      ) : null}
    </div>
  );
}
