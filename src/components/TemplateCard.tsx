'use client';

import { useState } from 'react';
import Image from 'next/image';
import fillHeartIcon from '../../public/svgs/icon-fillHeart.svg';
import emptyHeartIcon from '../../public/svgs/icon-emptyHeart.svg';
import clock from '../../public/svgs/icon-clock(W).svg';
import human from '../../public/svgs/icon-man(W).svg';

interface TemplateCardProps {
  title: string;
  subscription: string;
  deadline: string | number;
  request: string | number;
  borderRadius?: number;
}

const TemplateCard = ({
  title,
  subscription,
  deadline,
  request,
  borderRadius,
}: TemplateCardProps) => {
  const cardStyle = {
    borderRadius: `${borderRadius}px`,
  };

  const [isHeart, setIsHeart] = useState(false);
  return (
    <>
      <div
        style={cardStyle}
        className="flex justify-around w-[1000px] h-[250px] border border-gray-300 relative"
      >
        <div className="flex flex-col justify-evenly w-[40%]">
          <h2 className="text-[24px] font-bold">{title}</h2>
          <p className="whitespace-wrap font-bold">{subscription}</p>
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
                className="ml-[0.9px]"
              />
            </div>
            <p className="flex pt-2 ml-[1px] font-bold align-baseline">
              <Image
                src={clock}
                alt="시계 아이콘"
                className="mr-[6px] ml-[1px] align-baseline "
              />
              마감 D-{deadline}
            </p>
            <p className="flex pt-2 ml-[2px] font-bold align-baseline">
              <Image
                src={human}
                alt="인간 아이콘"
                className="mr-2 ml-[1px] align-baseline"
              />
              의뢰 {request}명
            </p>
          </div>
          <div className="flex justify-end">
            <button>자세히 보기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateCard;
