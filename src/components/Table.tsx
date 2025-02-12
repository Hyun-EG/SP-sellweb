'use client';

import { useState } from 'react';
import Pagination from './Pagination';
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

  return (
    <div className="w-[1200px] flex flex-col">
      <div className="w-[1200px] h-[100px] flex border-b border-[#afafaf] bg-[#f4f4f4]">
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
              <Link href={link}>{cell}</Link>
            </div>
          ))}
        </div>
      ))}
      <Pagination data={rows} setCurPageShowData={setCurPageShowData} />
    </div>
  );
}
