'use client';

import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/Input';
import Button from '@/components/Button';
import backGroundImg from '../../../public/bgs/bg-seeMySelf.webp';
import kakaoIcon from '../../../public/svgs/icon-kakao.svg';
import googleIcon from '../../../public/svgs/icon-google.svg';
import UserAuth from '@/components/UserAuth';

const Page = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center w-full h-[80vh] gap-[50px]">
        <div>
          <div className="flex flex-col h-[600px] justify-start gap-[18px]">
            <h1 className="text-[64px]">셀웹에 오신것을 </h1>
            <h2 className="text-[64px] text-right text-lightPurple">
              환영합니다.
            </h2>
            <Image
              className="w-[400px] h-[400px] items-center"
              src={backGroundImg}
              alt="회원가입 이미지"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[18px] w-[600px]">
          <h1 className="w-[500px] text-[28px] mb-[36px]">회원가입</h1>
          <Input
            state="default"
            placeholder="이름을 입력해주세요."
            width={428}
            height={48}
            borderRadius={8}
          />
          <div className="flex gap-[14px]">
            <Input
              state="default"
              placeholder="이메일을 입력해주세요."
              width={200}
              height={48}
              borderRadius={8}
            />
            <Button
              variant="request"
              state="default"
              theme="white"
              width={100}
              height={48}
              color="#ffffff"
              fontColor="#000000"
            >
              인증번호 받기
            </Button>
            <Button
              variant="confirm"
              theme="white"
              width={100}
              height={48}
              color="#afafaf"
              fontColor="#ffffff"
            >
              인증확인
            </Button>
          </div>
          <Input
            state="default"
            placeholder="아이디를 입력해주세요."
            width={428}
            height={48}
            borderRadius={8}
          />
          <Input
            state="default"
            placeholder="비밀번호를 입력해주세요."
            width={428}
            height={48}
            borderRadius={8}
          />
          <Input
            width={428}
            height={48}
            state="default"
            placeholder="비밀번호를 다시 입력해주세요."
            borderRadius={8}
          />
          <Button width={428} height={48} theme="white" state="default">
            회원가입
          </Button>
          <Button
            width={428}
            height={48}
            theme="white"
            color="#ffffff"
            fontColor="#000000"
            state="default"
          >
            <div className="flex items-center justify-center gap-4 w-full h-full ">
              <Image
                src={googleIcon}
                alt="구글로 회원가입"
                width={26}
                height={26}
              />
              <span>구글로 회원가입</span>
            </div>
          </Button>
          <Button
            width={428}
            height={48}
            theme="white"
            color="#ffea00"
            fontColor="#000000"
            state="default"
          >
            <div className="flex items-center justify-center gap-3 w-full h-full">
              <Image
                src={kakaoIcon}
                alt="카카오톡으로 회원가입"
                width={26}
                height={26}
              />
              <span>카카오톡으로 회원가입</span>
            </div>
          </Button>
          <div className="flex justify-center">
            <p className="text-[16px]">이미 셀웹의 회원이신가요?</p>
            <p
              className="ml-2 text-lightPurple text-[16px] cursor-pointer"
              onClick={() => setIsAuthModalOpen(true)}
            >
              로그인
            </p>
          </div>
        </div>
      </div>
      {isAuthModalOpen && (
        <UserAuth onClose={() => setIsAuthModalOpen(false)} />
      )}
    </>
  );
};

export default Page;
