import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import AuthModal from './AuthModal';
import SlideBar from './SlideBar';

interface UserAuthProps {
  onClose: () => void;
}

const UserAuth = ({ onClose }: UserAuthProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const findID = (
    <div>
      <Input width={360} height={50} placeholder="이름을 입력해주세요." />
      <Input width={360} height={50} placeholder="핸드폰번호를 입력해주세요." />
      <Button theme="white" state="default" width={360} height={50}>
        계정 찾기
      </Button>
    </div>
  );

  const findPW = (
    <div>
      <Input width={360} height={50} placeholder="이름을 입력해주세요." />
      <Input width={360} height={50} placeholder="아이디를 입력해주세요." />
      <Input width={360} height={50} placeholder="핸드폰번호를 입력해주세요." />
      <Button theme="white" state="default" width={360} height={50}>
        비밀번호 찾기
      </Button>
    </div>
  );

  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div onClick={handleOutsideClick}>
      <AuthModal>
        <h1 className="font-bold text-center text-3xl mt-8">SellWeb</h1>
        <div className="flex flex-col gap-6">
          <SlideBar
            slideWidth={120}
            items={['계정 찾기', '비밀번호 찾기']}
            onTabChange={setActiveTab}
          />
          {activeTab === 0 ? findID : findPW}
        </div>
      </AuthModal>
    </div>
  );
};

export default UserAuth;
