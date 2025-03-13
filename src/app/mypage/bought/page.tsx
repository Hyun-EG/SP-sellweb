import React from 'react';
import TitleBox from '@/components/TitleBox';
import ClientTable from '@/components/ClientTable';

const Page = () => {
  return (
    <>
      <TitleBox title="구매내역" />
      {/* 클라이언트 전용 Table 컴포넌트 렌더링 */}
      <ClientTable
        headers={[
          { label: '템플릿명', width: '300px' },
          { label: '구매날짜', width: '300px' },
          { label: '가격', width: '300px' },
          { label: '처리단계', width: '300px' },
        ]}
        rows={[['사원관리', '25.02.27', '협의', '개발중']]}
        link="/bought"
        rowIds={[]}
      />
    </>
  );
};

export default Page;
