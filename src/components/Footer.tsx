import Image from 'next/image';
import iconGithub from '../../public/svgs/icon-github(W).svg';
import iconMail from '../../public/svgs/icon-mail(W).svg';
import Link from 'next/link';
import iconLogo from '../../public/svgs/icon-logo.svg';

const Footer = () => {
  return (
    <div className="w-full h-[484px] flex justify-center items-center bg-white">
      <div className="w-[1200px] h-[484px] column border-t border-[#afafaf]">
        <div className="w-[1200px] h-[342px] flex border-[#afafaf] border-b">
          <div className="w-[300px] h-[342px] column text-black">
            <div className="w-[300px] h-[130px] flex justify-center items-center">
              <Image src={iconLogo} alt="로고" />
            </div>
            <div className="w-[300px] h-[212px]"></div>
          </div>
          <div className="w-[300px] h-[342px]">
            <div className="w-[300px] h-[130px] flex justify-center items-center text-black text-[24px]">
              템플릿안내
            </div>
            <div className="w-[300px] h-[52px] flex justify-center items-center text-black">
              서비스 소개
            </div>
            <div className="w-[300px] h-[52px] flex justify-center items-center text-black">
              <Link href="/temp">템플릿 둘러보기</Link>
            </div>
          </div>
          <div className="w-[300px] h-[342px]">
            <div className="w-[300px] h-[130px] flex justify-center items-center text-black text-[24px]">
              고객지원
            </div>
            <div className="w-[300px] h-[52px] flex justify-center items-center text-black">
              1:1 고객문의
            </div>
            <div className="w-[300px] h-[52px] flex justify-center items-center text-black">
              이용안내
            </div>
          </div>
          <div className="w-[300px] h-[342px]">
            <div className="w-[300px] h-[130px] flex justify-center items-center text-black text-[24px]">
              마이페이지
            </div>
            <div className="w-[300px] h-[52px] flex justify-center items-center text-black">
              구매내역
            </div>
            <div className="w-[300px] h-[52px] flex justify-center items-center text-black">
              문의내역
            </div>
            <div className="w-[300px] h-[52px] flex justify-center items-center text-black">
              내 정보 수정
            </div>
          </div>
        </div>
        <div className="w-[1200px] h-[142px] px-[20px] column">
          <div className="w-[1160px] h-[45px] flex justify-start items-center text-black">
            (주) 셀웹
          </div>
          <div className="w-[1160px] h-[26px] flex justify-start items-center text-black text-[13px]">
            대표 송재원 박성현 | 사업자 등록번호 123-45-678
          </div>
          <div className="w-[1160px] h-[71px] flex gap-[30px] justify-end items-center">
            <Image src={iconGithub} alt="깃허브 아이콘" />
            <Image src={iconMail} alt="메일 아이콘" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
