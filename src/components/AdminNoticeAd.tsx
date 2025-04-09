'use client';

import React, { useState } from 'react';
import AdminNotice from './AdminNotice';
import AdminAd from './AdminAd';

const AdminNoticeAd = () => {
  const [activeTab, setActiveTab] = useState<'notice' | 'ad'>('notice');

  return (
    <div>
      <div className="flex space-x-4 pb-2">
        <span
          className={`cursor-pointer ${
            activeTab === 'notice' ? 'font-bold' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('notice')}
        >
          공지사항
        </span>
        <span
          className={`cursor-pointer ${
            activeTab === 'ad' ? 'font-bold' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('ad')}
        >
          광고추가
        </span>
      </div>

      <div className="mt-2">
        {activeTab === 'notice' ? <AdminNotice /> : <AdminAd />}
      </div>
    </div>
  );
};

export default AdminNoticeAd;
