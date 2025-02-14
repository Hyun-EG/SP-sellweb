import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import SlideBar from './SlideBar';

interface UserAuthProps {
  onClose: () => void;
}

const UserAuth = ({ onClose }: UserAuthProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // 로그인
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // 아이디 찾기
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [foundID, setFoundID] = useState<string | null>(null);
  const [findIDError, setFindIDError] = useState<string | null>(null);

  // 비밀번호 찾기
  const [resetUserId, setResetUserId] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  // const [, setIsVerified] = useState(false);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message);
        return;
      }

      localStorage.setItem('token', data.token);
      alert('로그인 성공!');
      onClose();
    } catch {
      setLoginError('서버 오류가 발생했습니다.');
    }
  };

  const handleFindID = async () => {
    setFindIDError(null);
    setFoundID(null);

    try {
      const response = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFindIDError(data.message);
        return;
      }

      setFoundID(data.userId);
    } catch {
      setFindIDError('서버 오류가 발생했습니다.');
    }
  };

  const handleFindPassword = async () => {
    setResetError(null);

    try {
      // 비밀번호 찾기 인증번호 발송 요청
      const response = await fetch('/api/auth/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: resetUserId, email: resetEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResetError(data.message);
        return;
      }

      alert('이메일로 인증번호가 발송되었습니다.');
    } catch {
      setResetError('서버 오류가 발생했습니다.');
    }
  };
  // 🔹 인증번호 검증
  const handleVerifyCode = async () => {
    setResetError(null);

    try {
      // 인증번호 검증 요청
      const response = await fetch('/api/auth/find-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: resetUserId,
          email: resetEmail,
          verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResetError(data.message);
        return;
      }

      alert('인증 성공! 새 비밀번호를 설정하세요.');
    } catch {
      setResetError('서버 오류가 발생했습니다.');
    }
  };

  const loginForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold mb-2">
        <span className="text-lightPurple">아이디</span>와
        <span className="text-lightPurple">비밀번호</span>를 입력해주세요.
      </h2>
      <Input
        placeholder="아이디 입력"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        width={360}
        height={50}
      />
      <div className="flex justify-center items-center gap-5">
        <Input
          placeholder="비밀번호 입력"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width={240}
          height={50}
        />
        {loginError && <p className="text-red-500">{loginError}</p>}
        <Button theme="white" onClick={handleLogin} width={100} height={50}>
          로그인
        </Button>
      </div>
    </div>
  );

  const findIDForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold mb-2">
        이름과 이메일을 입력하세요.
      </h2>
      <Input
        placeholder="이름 입력"
        width={360}
        height={50}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        placeholder="이메일 입력"
        width={360}
        height={50}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {findIDError && <p className="text-red-500">{findIDError}</p>}
      {foundID && <p className="text-green-500">아이디: {foundID}</p>}
      <Button theme="white" onClick={handleFindID} width={360} height={50}>
        아이디 찾기
      </Button>
    </div>
  );

  const findPWForm = (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg font-semibold mb-2">
        아이디와 이메일을 입력하세요.
      </h2>
      <Input
        placeholder="아이디 입력"
        width={360}
        height={50}
        value={resetUserId}
        onChange={(e) => setResetUserId(e.target.value)}
      />
      <div className="flex justify-center items-center gap-5">
        <Input
          placeholder="이메일 입력"
          width={240}
          height={50}
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <Button
          theme="white"
          onClick={handleFindPassword}
          width={100}
          height={50}
        >
          인증번호 받기
        </Button>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Input
          placeholder="인증번호 입력"
          width={240}
          height={50}
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <Button
          theme="white"
          onClick={handleVerifyCode}
          width={100}
          height={50}
        >
          인증 확인
        </Button>
      </div>

      {resetError && <p className="text-red-500">{resetError}</p>}
    </div>
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[600px]"
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
          {activeTab === 0
            ? loginForm
            : activeTab === 1
              ? findIDForm
              : findPWForm}
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
