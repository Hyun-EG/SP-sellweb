'use client';

import { useState, useEffect } from 'react';

type Ad = {
  _id: string;
  content: string;
};

const AdBox = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShow, setIsShow] = useState<boolean>(true);

  const fetchAds = async () => {
    try {
      const res = await fetch('/api/adbox', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setAds(data.ads.reverse()); // 최근 광고 가져오기
      }
    } catch (error) {
      console.error('광고 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  // 최초 로딩 시 광고 불러오기
  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [ads]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAds();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!isShow || ads.length === 0) {
    return null;
  }

  return (
    <div className="h-10 flex justify-between items-center bg-customPink px-3">
      <span></span>
      <span className="text-white">{ads[currentIndex]?.content}</span>
      <span className="cursor-pointer" onClick={() => setIsShow(false)}>
        X
      </span>
    </div>
  );
};

export default AdBox;
