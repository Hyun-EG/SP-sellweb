import React from 'react';
import Image from 'next/image';
import Input from '@/components/Input';
import Button from '@/components/Button';
import backGroundImg from '../../../public/bgs/bg-seeMySelf.webp';
import kakaoIcon from '../../../public/svgs/icon-kakao.svg';
import googleIcon from '../../../public/svgs/icon-google.svg';

const page = () => {
  return (
    <>
      <div className="flex">
        <div>
          <div>
            <h1 className="text-[64px]">셀웹에 오신것을 </h1>
            <h2 className="text-[64px] text-right text-lightPurple">
              환영합니다.
            </h2>
          </div>
          <Image src={backGroundImg} alt="회원가입 이미지" />
        </div>
        <div className="flex flex-col items-center justify-evenly w-[600px]">
          <h1 className="w-[500px] text-[36px] mb-[36px]">회원가입</h1>
          <Input
            state="default"
            placeholder="이름을 입력해주세요."
            width={500}
            height={70}
            borderRadius={8}
          />
          <Input
            state="default"
            placeholder="아이디 또는 이메일을 입력해주세요."
            width={500}
            height={70}
            borderRadius={8}
          />
          <Input
            state="default"
            placeholder="비밀번호를 입력해주세요."
            width={500}
            height={70}
            borderRadius={8}
          />
          <Input
            width={500}
            height={70}
            state="default"
            placeholder="비밀번호를 다시 입력해주세요."
            borderRadius={8}
          />
          <Button width={500} height={70} state="white">
            회원가입
          </Button>
          <Button
            width={500}
            height={70}
            state="white"
            color="#ffffff"
            fontColor="#000000"
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <Image
                src={googleIcon}
                alt="구글로 회원가입"
                width={26}
                height={26}
                className="absolute left-4"
              />
              구글로 회원가입
            </div>
          </Button>
          <Button
            width={500}
            height={70}
            state="white"
            color="#ffea00"
            fontColor="#000000"
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <Image
                src={kakaoIcon}
                alt={'카카오톡으로 회원가입'}
                width={26}
                height={26}
                className="absolute left-4"
              />
              카카오톡으로 회원가입
            </div>
          </Button>
          <div className="flex justify-center">
            <p className="text-[16px]">이미 셀웹의 회원이신가요?</p>
            <p className="ml-2 text-lightPurple text-[16px] cursor-pointer ">
              로그인
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
