'use client';

import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className={`w-full ${path === '/admin' ? '' : 'px-[360px]'}`}>
      {children}
    </div>
  );
}
