'use client';

import { useState } from 'react';
import AdminTempCard from './AdminTempCard';
import Button from './Button';
import AdminTempModal from './AdminTempModal';

export default function AdminTemp() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="w-full h-full">
      <div className="h-[350px]">
        <div className="h-[50px] flex items-center gap-[10px]">
          <Button
            theme="white"
            width={80}
            height={40}
            color="#566270"
            state="default"
            onClick={() => setShowModal(true)}
          >
            추가
          </Button>
          <Button
            theme="white"
            width={80}
            height={40}
            color="#566270"
            state="default"
          >
            편집
          </Button>
          <Button
            theme="white"
            width={80}
            height={40}
            color="#566270"
            state="default"
          >
            삭제
          </Button>
        </div>
        <div className="h-[300px] p-[20px] flex flex-col gap-[10px] border border-[#afafaf] overflow-y-scroll">
          <AdminTempCard title="프로젝트임" content="프로젝트설명임" />
        </div>
      </div>

      {showModal && (
        <AdminTempModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}
