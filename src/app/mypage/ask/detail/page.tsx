import DetailTable from '@/components/DetailTable';
import TitleBox from '@/components/TitleBox';

export default function Page() {
  return (
    <div>
      <TitleBox title="문의 내역" />
      <DetailTable title="문의 제목" date="문의 날짜" content="문의 내용" />
    </div>
  );
}
