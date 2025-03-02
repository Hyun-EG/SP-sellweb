/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Button from './Button';
import Textarea from './Textarea';

interface TempData {
  _id?: string;
  title: string;
  description: string;
  service: string;
  priceInfo: string;
  imageUrls?: string[];
}

interface AdminTempModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: TempData;
  refresh: () => void;
}

export default function AdminTempModal({
  setShowModal,
  initialData,
  refresh,
}: AdminTempModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [service, setService] = useState('');
  const [priceInfo, setPriceInfo] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setService(initialData.service);
      setPriceInfo(initialData.priceInfo);
      setImageUrls(initialData.imageUrls || []);
    } else {
      setTitle('');
      setDescription('');
      setService('');
      setPriceInfo('');
      setImageUrls([]);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      service,
      priceInfo,
      imageUrls,
    };

    const url = initialData?._id ? '/api/update-temp' : '/api/upload-temp';
    const method = initialData?._id ? 'POST' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: initialData?._id }),
      });

      const result = await res.json();
      if (result.success) {
        alert('등록/수정 성공');
        setShowModal(false);
        refresh();
      } else {
        alert('등록/수정 실패');
      }
    } catch (error) {
      alert('에러 발생');
      console.error(error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[1000px] h-[700px] p-6 flex flex-col bg-white rounded-[12px]">
        <div className="h-[40px] flex justify-between items-center">
          <span>상품 {initialData ? '수정' : '추가'}</span>
          <button onClick={() => setShowModal(false)}>닫기</button>
        </div>
        <form className="h-[600px] p-[10px] flex flex-col gap-[10px] border border-[#afafaf] rounded-[12px]">
          <div className="h-[80px] flex items-center gap-[10px]">
            <span className="w-[100px]">프로젝트 이름</span>
            <input
              className="w-[600px] h-[40px] p-[10px] outline-0 border border-[#afafaf]"
              placeholder="프로젝트 이름을 입력해주세요."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="h-[150px] flex gap-[10px]">
            <div className="flex items-center">
              <span className="w-[100px]">프로젝트 설명</span>
            </div>
            <Textarea
              width="[600px]"
              height="[150px]"
              placeholder="프로젝트 설명을 입력해주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="h-[150px] flex flex-col gap-[10px]">
            <span>상품이미지 추가</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="h-[100px] flex gap-[10px]">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[70px] border border-[#afafaf]"
                >
                  <img
                    src={url}
                    alt={`미리보기 ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="h-[80px] flex items-center gap-[10px]">
            <span className="w-[100px]">서비스 소개</span>
            <Textarea
              width="[600px]"
              height="[70px]"
              placeholder="서비스 소개를 입력해주세요."
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>
          <div className="h-[80px] flex justify-between items-center gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <span className="w-[100px]">가격 정보</span>
              <Textarea
                width="[600px]"
                height="[70px]"
                placeholder="가격 정보를 입력해주세요."
                value={priceInfo}
                onChange={(e) => setPriceInfo(e.target.value)}
              />
            </div>
            <Button
              theme="white"
              width={80}
              height={40}
              color="#566270"
              state="default"
              onClick={handleSubmit}
            >
              완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
