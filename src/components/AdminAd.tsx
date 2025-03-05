'use client';

import { useState } from 'react';
import Button from './Button';
import Input from './Input';

const AdminAd = () => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAd = async () => {
    if (!content.trim()) {
      setMessage('광고 내용을 입력해주세요.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    try {
      const res = await fetch('/api/adbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('광고 추가 완료');
        setContent('');
        setTimeout(() => setMessage(''), 2000);
      } else {
        setMessage(`오류: ${data.message}`);
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (error) {
      console.error('광고 추가 중 오류:', error);
      setMessage('서버 에러');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleAdEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAd();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Input
          placeholder="광고 추가하기"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleAdEnter}
        />
        <Button theme="white" onClick={handleAddAd}>
          광고 추가
        </Button>
      </div>
      {message && <div className="text-sm text-green-500">{message}</div>}
    </div>
  );
};

export default AdminAd;
