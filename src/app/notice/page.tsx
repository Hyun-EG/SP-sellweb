import Table from '@/components/Table';
import TitleBox from '@/components/TitleBox';

export default function Notice() {
  const rows = [
    ['홍길동', 'gildong@example.com'],
    ['김철수', 'chulsoo@example.com'],
    ['홍길동', 'gildong@example.com'],
    ['김철수', 'chulsoo@example.com'],
    ['홍길동', 'gildong@example.com'],
    ['김철수', 'chulsoo@example.com'],
    ['홍길동', 'gildong@example.com'],
    ['김철수', 'chulsoo@example.com'],
    ['홍길동', 'gildong@example.com'],
    ['1', 'chulsoo@example.com'],
    ['2', 'gildong@example.com'],
    ['3', 'chulsoo@example.com'],
    ['4', 'gildong@example.com'],
    ['5', 'chulsoo@example.com'],
  ];

  return (
    <div className="h-screen">
      <TitleBox title="공지사항" />
      <Table
        headers={[
          { label: '이름', width: '100px' },
          { label: '이메일', width: '200px' },
        ]}
        rows={rows}
      />
    </div>
  );
}
