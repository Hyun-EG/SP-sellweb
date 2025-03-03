import PageOptions from '@/components/PageOptions';
import TemplateCard from '@/components/TemplateCard';
import TitleBox from '@/components/TitleBox';

export default function Temp() {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-[15px]">
      <TitleBox title="템플릿 소개" />
      <PageOptions />
      <TemplateCard width={1000} height={250} borderRadius={12} />
    </div>
  );
}
