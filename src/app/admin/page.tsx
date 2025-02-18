import AdminNotice from '@/components/AdminNotice';
import AdminSection from '@/components/AdminSection';

export default function Page() {
  return (
    <div className="h-full p-[20px] flex flex-col">
      <div className="w-full h-[400px] flex">
        <AdminSection title="공지사항">
          <div>
            <AdminNotice />
          </div>
        </AdminSection>
        <AdminSection title="대시보드">ㄴㅇ</AdminSection>
      </div>
      <div className="w-full h-[400px] flex">
        <AdminSection title="문의내역">ㄴㅇ</AdminSection>
        <AdminSection title="템플릿">ㄴㅇ</AdminSection>
      </div>
    </div>
  );
}
