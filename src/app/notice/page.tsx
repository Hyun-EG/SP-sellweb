import Table from '@/components/Table';
import TitleBox from '@/components/TitleBox';

export default function Notice() {
  return (
    <div>
      <TitleBox title="공지사항" />
      <Table
        headers={[
          { label: '이름', width: '100px' },
          { label: '이메일', width: '200px' },
        ]}
        rows={[
          ['홍길동', 'gildong@example.com'],
          ['김철수', 'chulsoo@example.com'],
        ]}
      />
    </div>
  );
}
