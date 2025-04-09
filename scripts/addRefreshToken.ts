import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

import { connectDB } from '../lib/db';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

async function addRefreshTokens() {
  try {
    await connectDB();

    const users = await User.find({ refreshToken: null }); // 기존에 리프레시 토큰이 없는 회원만 선택

    if (users.length === 0) {
      console.log('리프레시 토큰을 추가할 사용자가 없습니다.');
      return;
    }

    for (const user of users) {
      const refreshToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
        expiresIn: '7d', // 7일 동안 유효한 리프레시 토큰
      });

      user.refreshToken = refreshToken;
      await user.save();
      console.log(`User ${user.userId}에 리프레시 토큰을 추가했습니다.`);
    }

    console.log('리프레시 토큰 부여 작업이 완료되었습니다.');
  } catch (error) {
    console.error('리프레시 토큰 부여 중 오류 발생:', error);
  }
}

addRefreshTokens();
