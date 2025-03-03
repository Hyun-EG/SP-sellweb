'use client';

import { useEffect, useState } from 'react';
import AdminTempCard from './AdminTempCard';
import Button from './Button';
import AdminTempModal from './AdminTempModal';

interface TempData {
  _id: string;
  title: string;
  description: string;
  service: string;
  priceInfo: string;
  imageUrls: string[];
}

export default function AdminTemp() {
  const [showModal, setShowModal] = useState(false);
  const [tempList, setTempList] = useState<TempData[]>([]);
  const [selectedTemp, setSelectedTemp] = useState<TempData | null>(null);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/get-temp');
      const data = await res.json();
      setTempList(data.data);
    } catch (error) {
      console.error('템플릿 가져오기 실패', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedTemp) {
      alert('삭제할 템플릿을 선택해주세요.');
      return;
    }
    try {
      await fetch(`/api/delete-temp?id=${selectedTemp._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedTemp._id }),
      });
      fetchTemplates();
      setSelectedTemp(null);
    } catch (error) {
      console.error('템플릿 삭제 실패', error);
    }
  };

  const handleEdit = () => {
    if (!selectedTemp) {
      alert('수정할 템플릿을 선택해주세요.');
      return;
    }
    setShowModal(true);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

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
            onClick={() => {
              setSelectedTemp(null);
              setShowModal(true);
            }}
          >
            추가
          </Button>
          <Button
            theme="white"
            width={80}
            height={40}
            color="#566270"
            state="default"
            onClick={handleEdit}
          >
            편집
          </Button>
          <Button
            theme="white"
            width={80}
            height={40}
            color="#566270"
            state="default"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
        <div className="h-[300px] p-[20px] flex flex-col gap-[10px] border border-[#afafaf] overflow-y-scroll">
          {tempList.map((temp) => (
            <AdminTempCard
              key={temp._id}
              id={temp._id}
              title={temp.title}
              content={temp.description}
              isSelected={selectedTemp?._id === temp._id}
              onSelect={() => setSelectedTemp(temp)}
              imageUrls={temp.imageUrls ?? []}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <AdminTempModal
          showModal={showModal}
          setShowModal={setShowModal}
          initialData={selectedTemp ?? undefined}
          refresh={fetchTemplates}
        />
      )}
    </div>
  );
}
