'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SubNav from './SubNav';
import UserAuth from './UserAuth';
import logo from '../../public/svgs/icon-logo.svg';
import arrowDown from '../../public/svgs/icon-arrowDown.svg';

const NavBar = () => {
  const { data } = useSession() as {
    data: Session & { user: { admin?: boolean } };
  };
  const router = useRouter();
  const [isClick, setIsClick] = useState<string | false>(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const userName = data?.user?.name || '사용자';
  const isAdmin = data?.user?.admin || false;

  const templateItems = [{ label: '템플릿 소개', href: '/temp' }];
  const supportItems = [
    { label: '공지 사항', href: '/notice' },
    { label: '1:1 문의', href: '/ask' },
  ];
  const myPageItems = [
    { label: '구매내역', href: '/mypage/bought' },
    { label: '문의내역', href: '/mypage/ask' },
    { label: '내 정보 수정', href: '/mypage/edit' },
  ];

  const toggleDropdown = (dropdown: string) => {
    setIsClick((prev) => (prev === dropdown ? false : dropdown));
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });

      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      router.push('/');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

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
        <Link href={'/'}>
          <div className="flex items-center justify-center ml-12">
            <Image
              src={logo}
              alt="메인 로고"
              className="w-[137px] h-[36px] cursor-pointer"
            />
          </div>
        </Link>
        <ol className="flex justify-start items-center space-x-4 w-3/5">
          <Link href={'/'}>
            <li className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer">
              셀웹
            </li>
          </Link>
          <li
            onClick={() => toggleDropdown('template')}
            className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer"
          >
            템플릿 안내
            <Image
              src={arrowDown}
              alt="템플릿 안내 드롭다운"
              className="mb-1 ml-1"
            />
            {isClick === 'template' && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 w-[255px] bg-white z-50 rounded-lg shadow-md animate-rotateMenu origin-top-center"
              >
                <SubNav items={templateItems} />
              </div>
            )}
          </li>
          <li
            onClick={() => toggleDropdown('support')}
            className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer"
          >
            고객지원
            <Image
              src={arrowDown}
              alt="고객지원 드롭다운"
              className="mb-1 ml-1"
            />
            {isClick === 'support' && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 w-[255px] bg-white z-50 rounded-lg shadow-md animate-rotateMenu origin-top-center"
              >
                <SubNav items={supportItems} />
              </div>
            )}
          </li>
          <li
            onClick={() => toggleDropdown('myPage')}
            className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer"
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
                className="absolute top-full mt-2 w-[255px] bg-white z-50 rounded-lg shadow-md animate-rotateMenu origin-top-center"
              >
                <SubNav items={myPageItems} />
              </div>
            )}
          </li>

          {isAdmin && (
            <Link href="/admin">
              <li className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer">
                관리자
              </li>
            </Link>
          )}
        </ol>
        <ol className="flex justify-center items-center space-x-2 w-1/5 pl-8">
          {data ? (
            <>
              <li className="flex items-center justify-center w-[120px] h-[80px] text-center">
                <p>{userName} 님</p>
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer"
              >
                로그아웃
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer"
              >
                로그인
              </li>
              <Link href="/signup">
                <li className="flex items-center justify-center w-[120px] h-[80px] text-center cursor-pointer">
                  회원가입
                </li>
              </Link>
            </>
          )}
        </ol>
      </header>
      {isAuthOpen && <UserAuth onClose={() => setIsAuthOpen(false)} />}
    </>
  );
};

export default NavBar;
