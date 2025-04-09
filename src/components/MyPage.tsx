'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Button from './Button';

const MyPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (status === 'loading') {
    return (
      <div className="h-screen flex justify-center items-center">
        로딩 중...
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const myInfo = {
    name: session.user.name || '사용자',
    id: session.user.userId || '알 수 없음',
    email: session.user.email || '이메일 없음',
  };

  // 비밀번호 변경 요청
  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage('비밀번호를 입력하세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: myInfo.id,
          email: myInfo.email,
          newPassword,
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch {
      setMessage('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 text-center">
      <div>
        <div className="flex bg-lightGray w-[600px] h-[40px] justify-start items-center rounded-b-[8px]">
          <div className="font-bold ml-6">{myInfo.name}</div>
          님, 안녕하세요
        </div>
      </div>
      <div className="flex border-b border-[#afafaf]">
        <div className="flex w-[100px] h-[80px] justify-center items-center">
          이름
        </div>
        <div className="flex w-[500px] h-[80px] justify-center items-center">
          {myInfo.name}
        </div>
      </div>
      <div className="flex border-b border-[#afafaf]">
        <div className="flex justify-center items-center w-[100px] h-[80px]">
          아이디
        </div>
        <div className="flex w-[500px] h-[80px] justify-center items-center">
          {myInfo.id}
        </div>
      </div>
      <div className="flex border-b border-[#afafaf]"></div>
      <div className="flex items-center justify-center border-b border-[#afafaf]">
        <div className="flex justify-center items-center w-[100px] h-[80px]">
          비밀번호
        </div>
        <Input
          width={500}
          height={30}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center border-b border-[#afafaf]">
        <div className="flex flex-col justify-center items-center w-[100px] h-[80px]">
          비밀번호
          <div>재입력</div>
        </div>
        <Input
          width={500}
          height={30}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {message && <div>{message}</div>}

      <div className="flex justify-end w-[50%] mb-[10px]">
        <Button
          theme="white"
          state="default"
          width={100}
          height={40}
          color="#566270"
          onClick={handlePasswordChange}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
};

export default MyPage;
