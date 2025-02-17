import DetailTable from '@/components/DetailTable';
import TitleBox from '@/components/TitleBox';

export default function Page() {
  return (
    <div>
      <TitleBox title="공지 사항" />
      <DetailTable title="공지제목" date="공지날짜" content="공지내용" />
    </div>
  );
}
