'use client';

import { useState } from 'react';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Table({
  headers,
  rows,
  rowIds,
  link,
}: {
  headers: { label: string; width: string }[];
  rows: string[][];
  rowIds: string[];
  link: string;
}) {
  const [curPageShowData, setCurPageShowData] = useState<string[][]>([]);
  const param = usePathname();

  return (
    <div className="w-[1200px] h-screen pb-[150px] flex flex-col justify-between">
      <div>
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
        {curPageShowData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="h-[60px] flex border-b border-[#afafaf]"
          >
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="flex justify-center items-center"
                style={{ width: headers[cellIndex]?.width }}
              >
                {cellIndex === 1 ? (
                  <Link href={`${link}/${rowIds[rowIndex]}`}>{cell}</Link>
                ) : (
                  cell
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {param !== '/mypage/bought/detail' && (
        <Pagination data={rows} setCurPageShowData={setCurPageShowData} />
      )}
    </div>
  );
}
