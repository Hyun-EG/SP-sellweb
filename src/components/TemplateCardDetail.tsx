'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Image from 'next/image';
import Button from './Button';
import SlideBar from './SlideBar';
import Payment from './Payment';

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
    image?: string;
    priceInfo?: string;
    sellingCount?: number;
    imageUrls?: string[];
    price: number;
  }

  const [data, setData] = useState<TemplateData | null>(null);

  const router = useRouter();

  const serviceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

  const handleOrderSuccess = async () => {
    try {
      const res = await fetch(`/api/template/${id}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('판매량 업데이트 실패');
      }
      const result = await res.json();

      setData((prev) =>
        prev
          ? {
              ...prev,
              sellingCount: result.sellingCount,
            }
          : prev
      );
    } catch (error) {
      console.error('판매량 증가 처리 실패:', error);
    }
  };

  if (!data) {
    return <div className="text-center text-lg">로딩중</div>;
  }

  const ImageUrls = data.imageUrls || [];

  return (
    <>
      <section className="w-full mt-[20px]">
        <article className="flex justify-between items-end h-[300px]">
          <section className="w-[45%]">
            <Swiper spaceBetween={20} slidesPerView={1} loop>
              {ImageUrls.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-[300px] relative overflow-hidden rounded-lg">
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
          </section>

          <div className="flex flex-col justify-between w-[500px] h-full">
            <header>
              <h2 className="text-[24px] font-bold">{data.title}</h2>
            </header>
            <p className="whitespace-wrap font-bold">{data.description}</p>
            <footer className="flex justify-between items-center mt-4">
              {data.priceInfo && Number(data.priceInfo) > 0 ? (
                <Payment
                  id={id}
                  title={data.title}
                  priceInfo={data.priceInfo ? Number(data.priceInfo) : 0}
                  onOrderSuccess={handleOrderSuccess}
                />
              ) : (
                <Button
                  theme="white"
                  width={400}
                  height={40}
                  onClick={() => router.push('/ask')}
                >
                  의뢰하기
                </Button>
              )}
            </footer>
          </div>
        </article>
      </section>

      <nav>
        <SlideBar
          items={['서비스 소개', '이미지', '가격 정보']}
          slideWidth={120}
          onTabChange={(index) => {
            const refs = [serviceRef, imageRef, priceRef];
            refs[index]?.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          activeIndex={0}
        />
      </nav>

      <section className="mt-6 flex flex-col gap-10">
        <article ref={serviceRef} className="w-full h-[300px]">
          <h3 className="text-xl font-bold">서비스 소개</h3>
          <p>{data.service || '서비스 소개 내용 없음'}</p>
        </article>
        <article ref={imageRef}>
          <h3 className="text-xl font-bold mb-4">이미지</h3>
          {data.imageUrls && data.imageUrls.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {data.imageUrls.map((url, index) => (
                <div key={index} className="h-48 relative">
                  <Image
                    src={url}
                    alt={`템플릿 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>이미지가 없습니다</p>
          )}
        </article>
        <article ref={priceRef} className="w-full h-[300px]">
          <h3 className="text-xl font-bold">가격 정보</h3>
          <p>{data.priceInfo || '가격 정보 없음'}</p>
        </article>
      </section>
    </>
  );
};

export default TemplateCardDetail;
