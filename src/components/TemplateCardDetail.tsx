'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Button from './Button';
import SlideBar from './SlideBar';
import fillHeartIcon from '../../public/svgs/icon-fillHeart.svg';
import emptyHeartIcon from '../../public/svgs/icon-emptyHeart.svg';
import dummyImage from '../../public/bgs/bg-meeting.webp';

interface TemplateCardProps {
  title?: string;
  subscription?: string;
  borderRadius?: number;
}

const TemplateCardDetail = ({
  title,
  subscription,
  borderRadius,
}: TemplateCardProps) => {
  const cardStyle = {
    borderRadius: `${borderRadius}px`,
  };

  const [isHeart, setIsHeart] = useState(false);

  const serviceRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  // 요소 클릭 시 해당 탭으로 스크롤 이동
  const handleTabChange = (index: number) => {
    const refs = [serviceRef, priceRef, reviewRef];
    refs[index]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <div
        style={cardStyle}
        className="flex justify-between items-end w-[100%] h-[290px] mt-[20px]"
      >
        <div className="flex flex-col justify-evenly w-[45%]">
          <Image src={dummyImage} alt="사원관리 이미지" />
        </div>
        <div className="flex flex-col justify-between w-[500px] h-[100%]">
          <h2 className="text-[24px] font-bold">{title}</h2>
          <p className="whitespace-wrap font-bold">{subscription}</p>
          <div className="flex justify-between items-center">
            <Button
              theme="white"
              state="default"
              width={400}
              height={40}
              color="slateGray"
            >
              구매하기
            </Button>
            <div className="flex flex-col items-center">
              <div
                onClick={() => setIsHeart(!isHeart)}
                className="cursor-pointer items-center"
              >
                <Image
                  src={isHeart ? fillHeartIcon : emptyHeartIcon}
                  alt="찜하기 하트 아이콘"
                  className="flex items-center ml-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SlideBar
        items={['서비스 소개', '가격 정보', '리뷰']}
        slideWidth={120}
        onTabChange={handleTabChange}
        activeIndex={0}
      />
      <div className="mt-6 flex flex-col gap-10">
        <div ref={serviceRef} className="w-full h-[300px]">
          <h3 className="text-xl font-bold">서비스 소개</h3>
          <p>서비스 소개</p>
        </div>

        <div ref={priceRef} className="w-full h-[300px]">
          <h3 className="text-xl font-bold">가격 정보</h3>
          <p>가격 정보</p>
        </div>

        <div ref={reviewRef} className="w-full h-[300px]">
          <h3 className="text-xl font-bold">리뷰</h3>
          <p>리뷰</p>
        </div>
      </div>
      <Button theme="white" state="default" width={1200} height={60}>
        더보기
      </Button>
    </>
  );
};

export default TemplateCardDetail;
