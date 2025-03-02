import AdminAsk from '@/components/AdminAsk';
import AdminNotice from '@/components/AdminNotice';
import AdminSection from '@/components/AdminSection';
import AdminTemp from '@/components/AdminTemp';

export default function Page() {
  return (
    <div className="h-full p-[20px] flex flex-col">
      <div className="w-full h-[400px] flex">
        <AdminSection title="공지사항">
          <AdminNotice />
        </AdminSection>
        <AdminSection title="대시보드">ㄴㅇ</AdminSection>
      </div>
      <div className="w-full h-[400px] flex">
        <AdminSection title="문의내역">
          <AdminAsk />
        </AdminSection>
        <AdminSection title="템플릿">
          <AdminTemp />
        </AdminSection>
      </div>
    </div>
  );
}
