'use client';

import { useState, useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import Button from './Button';
import SlideBar from './SlideBar';
import fillHeartIcon from '../../public/svgs/icon-fillHeart.svg';
import emptyHeartIcon from '../../public/svgs/icon-emptyHeart.svg';

interface TemplateCardProps {
  id: string;
  borderRadius?: number;
  width?: number;
  height?: number;
  templateImages?: (string | StaticImageData)[];
}

const TemplateCardDetail = ({ id }: TemplateCardProps) => {
  interface TemplateData {
    title: string;
    description: string;
    service?: string;
    priceInfo?: string;
    sellingCount?: number;
    imageUrls?: (string | StaticImageData)[];
  }

  const [data, setData] = useState<TemplateData | null>(null);
  const [isHeart, setIsHeart] = useState(false);

  const serviceRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/template/${id}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleOrder = async () => {
    try {
      const res = await fetch(`/api/template/${id}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();

      if (res.ok) {
        setData((prev: TemplateData | null) =>
          prev
            ? {
                ...prev,
                sellingCount: result.sellingCount,
              }
            : prev
        );
      } else {
        throw new Error(result.error || '의뢰하기 요청 실패');
      }
    } catch (error) {
      console.error('의뢰하기 요청 실패:', error);
    }
  };

  const handleTabChange = (index: number) => {
    const refs = [serviceRef, priceRef];
    refs[index]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (!data) {
    return <div className="text-center text-lg">로딩중</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between mt-2">
        <div className="flex justify-center w-[50%] h-[200px]">
          <Swiper spaceBetween={20} slidesPerView={1} loop>
            {data.imageUrls?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-[450px] h-[200px] relative overflow-hidden rounded-lg justify-center">
                  <Image
                    src={image}
                    alt={`템플릿 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col justify-between w-[40%] h-[200px]">
          <h2 className="text-[24px] font-bold">{data.title}</h2>
          <p className="whitespace-wrap font-bold">{data.description}</p>
          <div className="flex justify-between items-center mt-4">
            <Button
              theme="white"
              state="default"
              width={400}
              height={40}
              color="slateGray"
              onClick={handleOrder}
            >
              의뢰하기
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
        items={['서비스 소개', '가격 정보']}
        slideWidth={120}
        onTabChange={handleTabChange}
        activeIndex={0}
      />
      <div className="mt-6 flex flex-col gap-10">
        <div ref={serviceRef} className="w-full h-[300px]">
          <h3 className="text-xl font-bold">서비스 소개</h3>
          <p>{data.service || '서비스 소개 내용 없음'}</p>
        </div>

        <div ref={priceRef} className="w-full h-[300px]">
          <h3 className="text-xl font-bold">가격 정보</h3>
          <p>{data.priceInfo || '가격 정보 없음'}</p>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button theme="white" state="default" width={1200} height={60}>
          더보기
        </Button>
      </div>
    </>
  );
};

export default TemplateCardDetail;
