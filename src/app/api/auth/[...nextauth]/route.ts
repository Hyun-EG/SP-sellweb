import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true, // 클라이언트에서 직접 접근할 수 없도록 설정
        secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 https 사용
        sameSite: 'lax', // 사이트 간 쿠키 전송 제한 설정
        path: '/', // 모든 경로에서 유효한 쿠키로 설정
        maxAge: 30 * 24 * 60 * 60, // 쿠키 만료 시간 (30일)
      },
    },
  },
  session: {
    strategy: 'jwt', // 세션 관리 방법 (JWT 사용)
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({}) {
      // 로그인 후 user 정보가 제대로 세션에 반영되도록 처리
      return true;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: Record<string, unknown>;
      user?: {
        id: string;
        name: string;
      };
      account?: {
        provider: string;
        access_token: string;
      };
    }) {
      // 로그인 후 유저 정보(예: 이름)를 토큰에 추가
      if (user) {
        token.userId = user.id;
        token.userName = user.name; // 이름을 토큰에 담기
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: {
        user: {
          userId: string;
          name: string;
          accessToken: string;
          provider: string;
        };
      };
      token: Record<string, unknown>;
    }) {
      // 세션에 사용자 정보 추가
      if (token) {
        session.user.userId = token.userId as string; // 유저 ID
        session.user.name = token.userName as string; // 유저 이름
        session.user.accessToken = token.accessToken as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // NextAuth secret key
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
