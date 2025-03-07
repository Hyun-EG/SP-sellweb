import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const isAdmin = Boolean(token.admin);

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token && Boolean(token.admin); // 관리자 여부 체크
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
