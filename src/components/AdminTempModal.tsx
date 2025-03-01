import React, { useState } from 'react';
import Button from './Button';
import Textarea from './Textarea';

interface AdminTempModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminTempModal({ setShowModal }: AdminTempModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [service, setService] = useState('');
  const [priceInfo, setPriceInfo] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[1000px] h-[700px] p-6 flex flex-col bg-white rounded-[12px]">
        <div className="h-[40px] flex justify-between items-center">
          <span>상품 추가/편집</span>
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
            <input type="file" multiple />
            <div className="h-[100px] flex gap-[10px]">
              <div className="w-[100px] h-[70px] border border-[#afafaf]">
                이미지
              </div>
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
            >
              완료
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
