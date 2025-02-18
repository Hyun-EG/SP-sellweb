interface AdminSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function AdminSection({ title, children }: AdminSectionProps) {
  return (
    <div className="w-[50%] p-[10px]">
      <div className="font-bold">{title}</div>
      <div>{children}</div>
    </div>
  );
}
