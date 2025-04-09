'use client';

import { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

const AdminAd = () => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [ads, setAds] = useState<{ _id: string; content: string }[]>([]);

  // 광고 추가
  const handleAddAd = async () => {
    if (!content.trim()) {
      setMessage('광고 내용을 입력해주세요.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    try {
      const res = await fetch('/api/add_ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('광고 추가 완료');
        setContent('');
        adList(); // 목록 갱신
      } else {
        setMessage(`오류: ${data.message}`);
      }
    } catch (error) {
      console.error('광고 추가 중 오류:', error);
      setMessage('서버 에러');
    } finally {
      setTimeout(() => setMessage(''), 2000);
    }
  };

  // 광고 삭제
  const handleDeleteAd = async (id: string) => {
    try {
      const res = await fetch('/api/delete_ad', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('광고 삭제 완료');
        setAds((prevAds) => prevAds.filter((ad) => ad._id !== id)); // UI에서 즉시 제거
      } else {
        setMessage(`오류: ${data.message}`);
      }
    } catch (error) {
      console.error('광고 삭제 중 오류:', error);
      setMessage('서버 에러');
    } finally {
      setTimeout(() => setMessage(''), 2000);
    }
  };

  // 광고 목록 불러오기
  const adList = async () => {
    try {
      const res = await fetch('/api/get_ad');
      const data = await res.json();
      setAds(data.reverse()); // 오래된 광고가 1번부터 나오도록 정렬
    } catch (error) {
      console.error('광고목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    adList();
  }, []);

  return (
    <>
      <div className="fw-full flex flex-col py-[10px]">
        <div className="w-[80%] flex justify-between gap-[5px] pb-[10px] border-b border-[#afafaf]">
          <Input
            placeholder="광고 추가하기"
            value={content}
            width={620}
            height={40}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button theme="white" width={80} height={40} onClick={handleAddAd}>
            추가
          </Button>
        </div>
        {message && <div className="text-sm text-green-500">{message}</div>}
      </div>

      {/* 광고 목록 */}
      <div className="w-[80%] max-h-[240px] overflow-y-auto border-[#afafaf]">
        <ul>
          {ads.length > 0 ? (
            ads.map((ad, index) => (
              <li
                key={ad._id}
                className="flex w-[100%] h-[50px] items-center gap-[15px] border-b border-[#afafaf]"
              >
                <span className="flex justify-center w-[10%]">{index + 1}</span>
                <span className="w-[70%]">{ad.content}</span>
                <div
                  className="w-[20%] cursor-pointer pl-9"
                  onClick={() => handleDeleteAd(ad._id)}
                >
                  삭제
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">등록된 광고가 없습니다.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default AdminAd;
