import React from 'react';
import TemplateCardDetail from '../../../components/TemplateCardDetail';
import TitleBox from '@/components/TitleBox';
import SlideBar from '@/components/SlideBar';

const page = () => {
  return (
    <>
      <TitleBox title="실시간 사원관리 웹사이트" />
      <TemplateCardDetail
        title="상품 기능 설명"
        subscription="해당 웹사이트는 광고심의를 자동배정 및 처리,수정이 가능합니다.
기존에 수동으로 진행하는 광고심의를 오토로 가능하도록,
템플릿을 만들었으며, 학습된 모델만 있으면 즉시 적용가능하도록
구현됐습니다.

또한, 직원관리 권한을 갖고있는 관리자의 전용 페이지가 존재하여,
직원관리 기능이 있고,  시각화 된 그래프로 
한눈에 전체 업무량과 직원의 업무량의 진행상황을 알아볼 수 있습니다."
      />
      <SlideBar />
    </>
  );
};

export default page;
