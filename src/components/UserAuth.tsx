import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import SlideBar from './SlideBar';

interface UserAuthProps {
  onClose: () => void;
}

const UserAuth = ({ onClose }: UserAuthProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const loginForm = (
    <div className="flex flex-col justify-evenly items-center gap-6">
      <h2 className="flex text-lg font-semibold mb-2">
        <p className="text-lightPurple ml-1">아이디</p>와
        <p className="text-lightPurple ml-1">비밀번호</p>를 입력해주세요.
      </h2>
      <Input placeholder="아이디를 입력해주세요." width={360} height={50} />
      <Input placeholder="비밀번호를 입력해주세요." width={360} height={50} />
      <Button theme="white" width={360} height={50}>
        로그인
      </Button>
    </div>
  );

  const findIDForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="flex text-lg font-semibold mb-2">
        본인의 <p className="text-lightPurple ml-1">이름</p>과
        <p className="text-lightPurple ml-1">이메일</p>을 입력해주세요
      </h2>
      <Input width={360} height={50} placeholder="이름을 입력해주세요." />
      <div className="flex justify-between items-center w-[360px]">
        <Input width={240} height={50} placeholder="이메일을 입력해주세요." />
        <Button theme="white" state="default" width={100} height={50}>
          인증요청
        </Button>
      </div>
      <Button theme="white" state="default" width={360} height={50}>
        계정 찾기
      </Button>
    </div>
  );

  const findPWForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="flex text-lg font-semibold">
        본인의<p className="text-lightPurple ml-1">아이디</p>와
        <p className="text-lightPurple ml-1">이메일</p>을 입력해주세요
      </h2>
      <div className="flex flex-col gap-6">
        <Input width={360} height={50} placeholder="아이디를 입력해주세요." />
        <div className="flex justify-between w-[100%]">
          <Input width={240} height={50} placeholder="이메일을 입력해주세요." />
          <Button theme="white" width={100} height={50} state="default">
            인증요청
          </Button>
        </div>
        <div className="flex justify-between w-[100%]">
          <Input
            width={240}
            height={50}
            placeholder="인증번호를 입력해주세요."
          />
          <Button theme="white" color="#afafaf" width={100} height={50}>
            인증확인
          </Button>
        </div>
      </div>
      <Button theme="white" state="default" width={360} height={50}>
        비밀번호 재설정
      </Button>
    </div>
  );

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg relative w-[400px] h-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="font-bold text-center text-3xl mt-8">SellWeb</h1>
          <SlideBar
            slideWidth={120}
            items={['로그인', '계정 찾기', '비밀번호 찾기']}
            onTabChange={setActiveTab}
            activeIndex={activeTab}
          />
          <div className="mt-6">
            {activeTab === 0 && loginForm}
            {activeTab === 1 && findIDForm}
            {activeTab === 2 && findPWForm}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAuth;
