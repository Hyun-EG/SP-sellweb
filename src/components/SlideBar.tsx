'use client';

import { useState, useEffect } from 'react';

interface SlideBarProps {
  slideWidth: number;
  items: string[];
  // eslint-disable-next-line no-unused-vars
  onTabChange: (index: number) => void;
  activeIndex: number;
}

const SlideBar = ({
  items = ['서비스 소개', '가격 정보', '리뷰'],
  slideWidth = 200,
  onTabChange,
  activeIndex,
}: SlideBarProps) => {
  const [activeIconIndex, setActiveIconIndex] = useState<number | null>(
    activeIndex
  );
  const [slideOffset, setSlideOffset] = useState(0);

  const handleIconClick = (index: number) => {
    setActiveIconIndex(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (activeIconIndex !== null) {
        const navIconElement = document.getElementsByClassName('nav-icon')[
          activeIconIndex
        ] as HTMLElement;
        if (navIconElement) {
          setSlideOffset(navIconElement.offsetLeft);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIconIndex]);

  return (
    <div className="relative flex flex-col items-center w-full h-[100px]">
      <div className="flex justify-center items-center w-full border-b-[1px] border-gray-300 relative">
        {activeIconIndex !== null && (
          <div
            className="absolute bottom-[-2px] h-[3px] bg-lightPurple transition-all duration-300"
            style={{ left: `${slideOffset}px`, width: `${slideWidth}px` }}
          ></div>
        )}
        <div className="flex w-full items-center">
          {items.map((text, index) => (
            <div
              key={index}
              className={`nav-icon cursor-pointer flex justify-center items-center text-center text-sm transition-all font-bold ${activeIconIndex === index ? 'text-lightPurple' : ''}`}
              style={{ width: `${slideWidth}px`, height: '100px' }}
              onClick={() => handleIconClick(index)}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
