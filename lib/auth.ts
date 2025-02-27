import jwt from 'jsonwebtoken';
import User from '../models/User'; // User 모델을 import

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

// Access Token 생성 (유효기간 짧음, 쿠키에 저장)
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // 15분 유효
};

// Refresh Token 생성 (유효기간 김, DB에 저장)
export const generateRefreshToken = async (userId: string) => {
  const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  }); // 7일 유효

  // refreshToken을 DB에 저장
  await User.updateOne({ userId }, { refreshToken });

  return refreshToken;
};

// Refresh Token 검증
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
};
