import React from 'react';
import TitleBox from '@/components/TitleBox';
import MyPage from '@/components/MyPage';

const page = () => {
  return (
    <>
      <TitleBox title="마이 페이지" />
      <MyPage />
    </>
  );
};

export default page;
