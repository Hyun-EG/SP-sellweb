import React from 'react';
import TemplateCardDetail from '../../../components/TemplateCardDetail';
import TitleBox from '@/components/TitleBox';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <>
      <TitleBox title={'템플릿 상세보기'} />
      <TemplateCardDetail id={params.id} />
    </>
  );
};

export default Page;
