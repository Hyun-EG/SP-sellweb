import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from './db';
import User from '../models/User';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string;
      name: string;
      accessToken: string;
      provider: string;
      admin: boolean;
      email: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
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
    strategy: 'jwt',
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

          const user = await User.findOne({ userId: credentials?.userId });
          if (!user) {
            throw new Error('아이디 또는 비밀번호를 확인해주세요.');
          }

          const isValidPassword = await bcrypt.compare(
            credentials?.password || '',
            user.password
          );
          if (!isValidPassword) {
            throw new Error('아이디 또는 비밀번호를 확인해주세요.');
          }

          return {
            id: user._id.toString(),
            userId: user.userId,
            name: user.userName ?? user.userId,
            email: user.email,
            admin: user.admin, // 관리자 여부 추가
            provider: 'credentials',
          };
        } catch (error) {
          console.error(error);
          throw new Error(
            error instanceof Error
              ? error.message
              : '로그인 중 오류가 발생했습니다.'
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.userId = (user as unknown as { userId: string }).userId;
        token.userName = user.name;
        token.admin = (user as unknown as { admin: string }).admin; // 관리자 여부 저장
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (profile && profile.name) {
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.userId = token.userId as string;
          session.user.name =
            (token.userName as string) || (token.name as string);
          session.user.accessToken = token.accessToken as string;
          session.user.provider = token.provider as string;
          session.user.admin = token.admin as boolean; // 관리자 여부 세션에 추가
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
