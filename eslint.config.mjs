import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended'
  ),
  {
    rules: {
      'prettier/prettier': 'error', // prettier 강제
      'react/react-in-jsx-scope': 'off', // SSR 컴포넌트에선 리액트 import 불필요
      'no-console': ['warn', { allow: ['warn', 'error'] }], // 디버깅용 콘솔로그 코드에서 삭제
      eqeqeq: ['error', 'always'], //  === , !==를 사용
      curly: ['error', 'all'], // 모든 제어문에서 중괄호 사용
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수 경고
    },
  },
];

export default eslintConfig;
