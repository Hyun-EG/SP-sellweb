import React from 'react';
import Input from './Input';
import Button from './Button';

const MyPage = () => {
  const myInfo = [{ name: '송재원' }, { id: 'aro_jr@naver.com' }];
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-4 text-center ">
        <div>
          <div className="flex bg-lightGray w-[600px] h-[40] justify-start items-center rounded-b-[8px]">
            <div className="font-bold ml-6">{myInfo[0].name}</div>
            님, 안녕하세요
          </div>
        </div>
        <div className="flex border-b border-[#afafaf]">
          <div className="flex w-[100px] h-[80px] justify-center items-center">
            이름
          </div>
          <div className="flex w-[500px] h-[80px] justify-center items-center ">
            {myInfo[0].name}
          </div>
        </div>
        <div className="flex border-b border-[#afafaf]">
          <div className="flex justify-center items-center w-[100px] h-[80px] ">
            아이디
          </div>
          <div className="flex w-[500px] h-[80px] justify-center items-center">
            {myInfo[1].id}
          </div>
        </div>
        <div className="flex border-b border-[#afafaf]"></div>
        <div className="flex items-center justify-center border-b border-[#afafaf]">
          <div className="flex justify-center items-center w-[100px] h-[80px]">
            비밀번호
          </div>
          <Input width={500} height={30} />
        </div>
        <div className="flex items-center justify-center border-b border-[#afafaf]">
          <div className="flex flex-col justify-center items-center w-[100px] h-[80px]">
            비밀번호
            <div>재입력</div>
          </div>
          <Input width={500} height={30} />
        </div>
        <div className="flex justify-end w-[50%] mb-[10px]">
          <Button
            theme="white"
            state="default"
            width={100}
            height={40}
            color="#566270"
          >
            수정하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
