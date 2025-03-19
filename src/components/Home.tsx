'use client';

import { useRouter } from 'next/navigation';
import iconTailwind from '../../public/home-svgs/icon-tailwind.svg';
import iconCss from '../../public/home-svgs/icon-css.svg';
import iconDocker from '../../public/home-svgs/icon-docker.svg';
import iconGit from '../../public/home-svgs/icon-git.svg';
import iconGitHub from '../../public/home-svgs/icon-github.svg';
import iconHtml from '../../public/home-svgs/icon-html.svg';
import iconNext from '../../public/home-svgs/icon-next.svg';
import iconReact from '../../public/home-svgs/icon-react.svg';
import iconRedux from '../../public/home-svgs/icon-redux.svg';
import iconJest from '../../public/home-svgs/icon-jest.png';
import iconSass from '../../public/home-svgs/icon-sass.png';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const Home = () => {
  const effRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const iconArr = [
    iconNext,
    iconReact,
    iconRedux,
    iconHtml,
    iconGit,
    iconGitHub,
    iconCss,
    iconTailwind,
    iconDocker,
    iconJest,
    iconSass,
  ];

  const doubleIconArr = [...iconArr, ...iconArr];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (effRef.current) {
      observer.observe(effRef.current);
    }

    return () => {
      if (effRef.current) {
        observer.unobserve(effRef.current);
      }
    };
  }, []);

  return (
    <div className="h-full">
      <div className="flex h-[500px] px-[360px] border-b border-[#afafaf] bg-gradient-to-r from-[#f8a3c6] to-[#fde3ed] p-6 rounded-lg shadow-lg">
        <div className="w-[50%] h-[450px] flex flex-col justify-center items-center">
          <div className="pb-[60px] text-[#fff] text-[40px]">
            맞춤형 웹사이트, 빠르고 쉽게!
            <br />
            최고의 선택 <span className="text-[#db2777] text-[44px]">셀웹</span>
          </div>
          <div>
            <button
              onClick={() => {
                router.push('/temp');
              }}
              className="p-[20px] bg-white border border-[#db2777] rounded-[12px]"
            >
              템플릿 보러가기
            </button>
          </div>
        </div>
      </div>
      <div className="h-[200px] flex items-center gap-[100px] border-b border-[#afafaf] overflow-hidden">
        <div className="w-[2750px] flex gap-[150px] animate-slideImage">
          {doubleIconArr.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              <Image className="w-[100px] h-[100px]" src={item} alt="이미지" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-[1080px] px-[360px]">
        <div className="w-[50%] py-[200px] flex flex-col justify-between items-center">
          <div
            ref={effRef}
            className={`font-bold text-center text-6xl/[100px] transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            웹사이트 템플릿으로
            <br />더 나은 비즈니스를!
          </div>
          <div
            className={`font-bold text-center text-6xl/[100px] transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            웹사이트는 물론,
            <br />
            템플릿으로 콘텐츠까지 쉽게!
          </div>
        </div>
        <div className="w-[50%] py-[100px] flex flex-col justify-start items-center"></div>
      </div>
      <div className="h-[1080px] bg-black"></div>
    </div>
  );
};

export default Home;
