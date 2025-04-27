'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CUR_PER_PAGE = 10;

export default function Pagination({
  data,
  setCurPageShowData,
}: {
  data: string[][];
  setCurPageShowData: React.Dispatch<React.SetStateAction<string[][]>>;
}) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const totalPage = Math.ceil(data.length / CUR_PER_PAGE);

  useEffect(() => {
    const startIndex = (page - 1) * CUR_PER_PAGE;
    const curPageShowData = data.slice(startIndex, startIndex + CUR_PER_PAGE);
    setCurPageShowData(curPageShowData);

    router.push(`?page=${page}`);
  }, [page, data, setCurPageShowData, router]);

  return (
    <div className="my-[20px] flex justify-center items-center gap-[20px]">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={`w-[40px] h-[40px] justify-center items-center border border-[#afafaf] ${page === 1 ? 'bg-[#f4f4f4] text-[#afafaf]' : ''}`}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`${
            page === pageNum ? 'text-gray-300 font-bold' : 'border-[#afafaf]'
          }`}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
        className={`w-[40px] h-[40px] justify-center items-center border border-[#afafaf] ${page === totalPage ? 'bg-[#f4f4f4] text-[#afafaf]' : ''}`}
        disabled={page === totalPage}
      >
        &gt;
      </button>
    </div>
  );
}
