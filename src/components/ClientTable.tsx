'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import AlertModal from './AlertModal';

const ClientTable = ({
  headers,
  rows,
  rowIds,
  link,
}: {
  headers: { label: string; width: string }[];
  rows: string[][];
  rowIds: string[];
  link: string;
}) => {
  const [curPageShowData, setCurPageShowData] = useState<string[][]>([]);
  const [curRowIds, setCurRowIds] = useState<string[]>([]);
  const [isShowAlertModal, setIsShowAlertModal] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!session) {
      setIsShowAlertModal(true);
    }
    return () => {
      setIsShowAlertModal(false);
    };
  }, [session, status, router]);

  useEffect(() => {
    if (rows.length === 0 || rowIds.length === 0) {
      return;
    }
    const startIndex = (parseInt(page, 10) - 1) * 10;
    const curData = rows.slice(startIndex, startIndex + 10);
    const curIds = rowIds.slice(startIndex, startIndex + 10);
    setCurPageShowData(curData);
    setCurRowIds(curIds);
  }, [page, rows, rowIds]);

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
          <Link
            key={rowIndex}
            href={`${link}/${curRowIds[rowIndex]}?page=${page}`}
            className="h-[60px] flex border-b border-[#afafaf] cursor-pointer hover:bg-gray-100"
          >
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="flex justify-center items-center"
                style={{ width: headers[cellIndex]?.width }}
              >
                {cell}
              </div>
            ))}
          </Link>
        ))}
      </div>
      {isShowAlertModal && (
        <AlertModal
          onClick={() => {
            router.push('/');
          }}
          title="로그인이 필요합니다."
          content="계속하시려면 로그인이 필요합니다."
          btnName="확인"
        />
      )}
    </div>
  );
};

const SuspenseTableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

export default function Page({
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
  return (
    <SuspenseTableWrapper>
      <ClientTable headers={headers} rows={rows} rowIds={rowIds} link={link} />
    </SuspenseTableWrapper>
  );
}
