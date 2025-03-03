import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../../../lib/db';
import User from '../../../../../models/User';

export const authOptions = {
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30일
      },
    },
  },
  session: {
    strategy: 'jwt' as 'jwt' | 'database',
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
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: '아이디', type: 'text', placeholder: '아이디 입력' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          // 유저를 찾고, 'userName'과 'email'을 포함한 유저 객체 반환
          const user = await User.findOne({ userId: credentials?.userId });
          if (!user) {
            throw new Error('아이디 또는 비밀번호를 확인해주세요.');
          }

          // 비밀번호 비교
          const isValidPassword = await bcrypt.compare(
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            credentials?.password!,
            user.password
          );
          if (!isValidPassword) {
            throw new Error('아이디 또는 비밀번호를 확인해주세요.');
          }

          // 유저 정보를 반환, 'userName'을 'name'으로 반환유저 객체를 출력하여 'userName'이 있는지 확인
          return {
            id: user._id.toString(),
            userId: user.userId,
            name: user.userName ?? user.userId,
            email: user.email,
            provider: 'credentials',
          };
        } catch (error) {
          console.error(error); // 에러 발생 시 로그 출력
          if (error instanceof Error) {
            throw new Error(error.message || '로그인 중 오류가 발생했습니다.');
          } else {
            throw new Error('로그인 중 오류가 발생했습니다.');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: Record<string, unknown>;
      user?: { id: string; name: string; email: string };
      account?: { access_token?: string; provider?: string };
      profile?: { name?: string; email?: string };
    }) {
      // 로그인 시 'name'을 토큰에 추가
      if (user) {
        token.userId = user.id;
        token.userName = user.name; // 'name'을 token에 저장
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider; // 'provider'를 토큰에 저장
      }
      if (profile && profile.name) {
        token.name = profile.name; // profile에서 제공된 'name'을 token에 저장
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
      if (token) {
        session.user.userId = token.userId as string;
        session.user.name =
          (token.userName as string) || (token.name as string);
        session.user.accessToken = token.accessToken as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
