import React from 'react';
import TitleBox from '@/components/TitleBox';
import Table from '@/components/Table';

const Page = () => {
  return (
    <>
      <TitleBox title="구매내역" />

      <Table
        headers={[
          { label: '템플릿명', width: '300px' },
          { label: '구매날짜', width: '300px' },
          { label: '가격', width: '300px' },
          { label: '처리단계', width: '300px' },
        ]}
        rows={[['사원관리', '25.02.27', '협의', '개발중']]}
        link="/bought"
      />
    </>
  );
};

export default Page;
