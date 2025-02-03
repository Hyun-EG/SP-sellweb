'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SubNav from './SubNav';
import logo from '../../public/svgs/icon-logo.svg';
import darkMode from '../../public/svgs/icon-moon.svg';
import arrowDown from '../../public/svgs/icon-arrowDown.svg';

const NavBar = () => {
  const [isClick, setIsClick] = useState<string | false>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setIsClick((prev) => (prev === dropdown ? false : dropdown));
  };

  const templateItems = ['템플릿 소개', '기능 소개'];
  const supportItems = ['1:1문의', '이용안내'];
  const myPageItems = ['구매내역', '문의내역', '내 정보 수정', '찜 목록'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="flex justify-between items-center shadow-md h-[80px] relative">
        <div className="flex items-center justify-center ml-12 ">
          <Image
            src={logo}
            alt="메인 로고"
            className="w-[137px] h-[36px] cursor-pointer "
          />
        </div>
        <ol className="flex justify-start items-center space-x-4 w-3/5 ">
          <li className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer ">
            셀웹
          </li>
          <li
            onClick={() => toggleDropdown('template')}
            className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer "
          >
            템플릿 안내{' '}
            <Image
              src={arrowDown}
              alt="템플릿 안내 드롭다운"
              className="mb-1 ml-1"
            />
            {isClick === 'template' && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 w-[255px] bg-white text-white z-50 rounded-lg shadow-md  "
              >
                <SubNav items={templateItems} />
              </div>
            )}
          </li>
          <li
            onClick={() => toggleDropdown('support')}
            className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer "
          >
            고객지원{' '}
            <Image
              src={arrowDown}
              alt="고객지원 드롭다운"
              className="mb-1 ml-1"
            />
            {isClick === 'support' && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 w-[255px] bg-white text-white z-50 rounded-lg shadow-md"
              >
                <SubNav items={supportItems} />
              </div>
            )}
          </li>
          <li
            onClick={() => toggleDropdown('myPage')}
            className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer "
          >
            마이페이지
            <Image
              src={arrowDown}
              alt="마이페이지 드롭다운"
              className="mb-1 ml-1"
            />
            {isClick === 'myPage' && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 w-[255px] bg-white text-white z-50 rounded-lg shadow-md"
              >
                <SubNav items={myPageItems} />
              </div>
            )}
          </li>
        </ol>
        <ol className="flex justify-center items-center space-x-2 w-1/5 pl-8">
          <li className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer">
            로그인
          </li>
          <li className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer">
            회원가입
          </li>
          <div className="flex items-center justify-center w-[80px] h-[80px]">
            <Image
              src={darkMode}
              alt="다크모드 전환 버튼"
              className="w-[30px] h-[30px] cursor-pointer"
            />
          </div>
        </ol>
      </header>
    </>
  );
};

export default NavBar;
