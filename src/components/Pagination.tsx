'use client';

import { useState, useEffect } from 'react';

const CUR_PER_PAGE = 10;

export default function Pagination({
  data,
  setCurPageShowData,
}: {
  data: string[][];
  setCurPageShowData: React.Dispatch<React.SetStateAction<string[][]>>;
}) {
  const [page, setPage] = useState(1);

  const totalPage = Math.ceil(Number(data.length) / CUR_PER_PAGE);
  const startIndex = (page - 1) * CUR_PER_PAGE;
  const curPageShowData = data.slice(startIndex, startIndex + CUR_PER_PAGE);

  useEffect(() => {
    setCurPageShowData(curPageShowData);
  }, [page, curPageShowData, setCurPageShowData]);

  return (
    <div className="my-[20px] flex justify-center items-center gap-[20px]">
      <button
        onClick={() => {
          setPage((prev) => Math.max(prev - 1, 1));
        }}
        className="w-[40px] h-[40px] justify-center items-center border border-[#afafaf]"
      >
        &lt;
      </button>
      <div>{page}</div>
      <button
        onClick={() => {
          setPage((prev) => Math.min(prev + 1, totalPage));
        }}
        className="w-[40px] h-[40px] justify-center items-center border border-[#afafaf]"
      >
        &gt;
      </button>
    </div>
  );
}
