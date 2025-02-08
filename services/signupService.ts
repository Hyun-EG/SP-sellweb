import bcrypt from 'bcryptjs';
import User from '../models/User';

function checkUserName(userName: string): boolean {
  const userNameRegex = /^[a-zA-Z가-힣]{3,20}$/;
  return userNameRegex.test(userName);
}

function checkUserId(userId: string): boolean {
  const userIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return userIdRegex.test(userId);
}

function checkPhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phoneNumber);
}

function checkPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/]).{8,}$/;

  return passwordRegex.test(password);
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export default async function signupUser(
  userName: string,
  userId: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string
) {
  if (!checkUserName(userName)) {
    throw new Error('올바른 이름을 입력해주세요.');
  }

  if (!checkUserId(userId)) {
    throw new Error('올바른 아이디를 입력해주세요.');
  }

  if (!checkPhoneNumber(phoneNumber)) {
    throw new Error('전화번호는 10~11자리 숫자여야 합니다.');
  }

  if (!checkPassword(password)) {
    throw new Error(
      '비밀번호는 최소 8자 이상, 대소문자와 숫자를 포함해야 합니다.'
    );
  }

  if (password !== confirmPassword) {
    throw new Error('비밀번호가 서로 일치하지 않습니다.');
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    userName,
    userId,
    password: hashedPassword,
    phoneNumber,
  });

  await user.save();
  return user;
}
