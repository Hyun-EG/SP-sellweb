import TemplateCard from '../../components/TemplateCard';

const page = () => {
  return (
    <>
      <TemplateCard
        borderRadius={16}
        title={'실시간 사원관리 웹사이트'}
        subscription={
          '사내에 직원 급여 관리 및 실적관리를 베이스로 한눈에 확인할 수 있는 시각화된 이미지로 관리에 탁월한 사이트입니다.'
        }
        deadline={'1'}
        request={'3'}
      />
    </>
  );
};
export default page;
