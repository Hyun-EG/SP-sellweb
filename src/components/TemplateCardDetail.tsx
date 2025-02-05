'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
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
          {' '}
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
    </>
  );
};

export default TemplateCardDetail;
