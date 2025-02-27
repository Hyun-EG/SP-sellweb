'use client';

import { useEffect, useState } from 'react';
import Textarea from './Textarea';
import Button from './Button';

interface AdminAskModalProps {
  postId: string;
  onClick: () => void;
}

interface PostDetail {
  userName: string;
  title: string;
  createdAt: string;
  content: string;
  reply: string;
}

export default function AdminAskModal({ postId, onClick }: AdminAskModalProps) {
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();
        setPostDetail(data);
        setReply(data.reply || '');
      } catch (error) {
        console.error('데이터 조회 실패', error);
      }
    };
    fetchPostDetail();
  }, [postId]);

  const handleSaveReply = async () => {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply }),
      });
      alert('답변이 저장되었습니다.');
    } catch (error) {
      console.error('답변 저장 실패', error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClick}
    >
      <div
        className="w-[1000px] h-[700px] flex flex-col bg-white border border-[#afafaf] rounded-[12px] p-[10px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-[10px] flex justify-between">
          <h2 className="text-xl font-bold">문의 상세 내용</h2>
          <button onClick={onClick}>닫기</button>
        </div>
        {postDetail ? (
          <div className="h-full border border-[#afafaf] rounded-[12px]">
            <div className="py-[10px] px-[20px] flex justify-between items-center border-b">
              <div>{postDetail.userName}</div>
              <div>{postDetail.createdAt}</div>
            </div>
            <div className="p-[20px]">{postDetail.content}</div>
            <div className="flex items-center gap-4 p-4">
              <Textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                width="[100%]"
                height="[100%]"
              />
              <Button
                theme="white"
                width={80}
                height={40}
                color="#566270"
                onClick={handleSaveReply}
              >
                완료
              </Button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
