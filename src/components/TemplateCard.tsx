'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import fillHeartIcon from '../../public/svgs/icon-fillHeart.svg';
import emptyHeartIcon from '../../public/svgs/icon-emptyHeart.svg';
import human from '../../public/svgs/icon-man(W).svg';
import Button from '@/components/Button';

interface TemplateCardProps {
  borderRadius?: number;
  width?: number;
  height?: number;
  templateImages?: (string | StaticImageData)[];
}

const TemplateCard = ({ width, borderRadius, height }: TemplateCardProps) => {
  interface Template {
    title: string;
    description: string;
    templateImages?: (string | StaticImageData)[];
    subscription?: string;
    request?: string | number;
  }

  const [tempList, setTempList] = useState<Template[]>([]);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/get-temp');
      const data = await res.json();
      setTempList(data.data);
    } catch (error) {
      console.error('템플릿 가져오기 실패', error);
    }
  };

  const [isHeart, setIsHeart] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const cardStyle = {
    width: width,
    height: height,
    borderRadius,
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      {tempList.map((template, index) => (
        <div
          key={index}
          style={cardStyle}
          className="flex justify-around w-full max-w-[1000px] h-[250px] border border-gray-300"
        >
          <div className="flex flex-col justify-evenly w-[40%]">
            <h2 className="text-[24px] font-bold">{template.title}</h2>
            <p className="text-gray-600">{template.description}</p>
            <div className="flex gap-2 overflow-x-auto">
              {(template.templateImages ?? []).length > 0 ? (
                template.templateImages?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`템플릿 이미지 ${index + 1}`}
                    width={120}
                    height={120}
                  />
                ))
              ) : (
                <Image
                  src="/default-image-path.jpg"
                  alt="기본 이미지"
                  width={120}
                  height={120}
                />
              )}
            </div>
            <p className="font-bold">{template.subscription}</p>
          </div>
          <div className="flex flex-col justify-evenly w-[20%]">
            <div className="h-[60%] relative">
              <div className="absolute top-0 bottom-[50px] right-[210px] w-px bg-gray-300"></div>
              <div
                onClick={() => setIsHeart(!isHeart)}
                className="cursor-pointer"
              >
                <Image
                  src={isHeart ? fillHeartIcon : emptyHeartIcon}
                  alt="찜하기 하트 아이콘"
                  className="ml-[0.9px] "
                />
              </div>
              <p className="flex pt-2 ml-[2px] font-bold align-baseline">
                <Image
                  src={human}
                  alt="의뢰 맡긴 사람 수 아이콘"
                  className="mr-2 ml-[1px]"
                />
                의뢰 {template.request}명
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                theme="white"
                state="default"
                width={100}
                height={40}
                color="white"
                fontColor="black"
              >
                자세히 보기
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateCard;
