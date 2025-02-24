'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/Input';
import Button from '@/components/Button';
import UserAuth from '@/components/UserAuth';
import backGroundImg from '../../../public/bgs/bg-seeMySelf.webp';
import kakaoIcon from '../../../public/svgs/icon-kakao.svg';
import googleIcon from '../../../public/svgs/icon-google.svg';
import Cookie from 'js-cookie';

const Page = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // Google 로그인
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  // Kakao 로그인
  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: '/' });
  };

  // 직접 웹 로그인
  const handleWebLogin = async () => {
    const formData = {
      userName,
      userId,
      password,
      email,
    };

    try {
      const response = await fetch('/api/auth/user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const { accessToken, refreshToken } = result;
        Cookie.set('accessToken', accessToken, { expires: 1, path: '/' });
        Cookie.set('refreshToken', refreshToken, {
          expires: 7,
          path: '/',
          httpOnly: true,
        });

        alert('회원가입 성공!');
        setUserId('');
        setUserName('');
        setPassword('');
        setEmail('');
      } else {
        alert(`회원가입 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/auth/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('이메일 발송 실패');
      }

      const data = await response.json();

      if (data.message === '인증번호가 이메일로 전송되었습니다.') {
        alert('인증 코드가 이메일로 발송되었습니다.');
      } else {
        alert('이메일 발송에 실패했습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
      alert('이메일 발송에 실패했습니다.');
    }
  };

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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <div className="flex gap-[14px]">
            <Input
              state="default"
              placeholder="이메일을 입력해주세요."
              width={200}
              height={48}
              borderRadius={8}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              variant="request"
              state="default"
              theme="white"
              width={100}
              height={48}
              color="#ffffff"
              fontColor="#000000"
              onClick={handleSendEmail}
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
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <Input
            type="password"
            state="default"
            placeholder="비밀번호를 입력해주세요."
            width={428}
            height={48}
            borderRadius={8}
            required
          />
          <Input
            type="password"
            width={428}
            height={48}
            state="default"
            placeholder="비밀번호를 다시 입력해주세요."
            borderRadius={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            width={428}
            height={48}
            theme="white"
            state="default"
            onClick={handleWebLogin}
          >
            회원가입
          </Button>
          <Button
            width={428}
            height={48}
            theme="white"
            color="#ffffff"
            fontColor="#000000"
            state="default"
            onClick={handleGoogleLogin}
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
            onClick={handleKakaoLogin}
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
