import TemplateCard from '@/components/TemplateCard';
import TitleBox from '@/components/TitleBox';

export default function Temp() {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-[15px]">
      <TitleBox title="템플릿 소개" />
      <TemplateCard
        title="실시간 사원관리 웹사이트"
        subscription="이거 사원관리 잘됨"
        deadline="D-24"
        request={2}
        borderRadius={12}
      />
      <TemplateCard
        title="실시간 사원관리 웹사이트"
        subscription="이거 사원관리 잘됨"
        deadline="D-24"
        request={2}
        borderRadius={12}
      />
      <TemplateCard
        title="실시간 사원관리 웹사이트"
        subscription="이거 사원관리 잘됨"
        deadline="D-24"
        request={2}
        borderRadius={12}
      />
    </div>
  );
}
