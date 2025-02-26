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
}

export default function AdminAskModal({ postId, onClick }: AdminAskModalProps) {
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await fetch(`/api/get-posts/${postId}`);
        const data = await res.json();
        setPostDetail(data);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClick}
    >
      <div
        className="w-[1000px] h-[700px] flex flex-col bg-white border border-[#afafaf] rounded-[12px] p-[10px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" p-[10px] flex justify-between">
          <h2 className="text-xl font-bold">문의 상세 내용</h2>
          <button onClick={onClick}>닫기</button>
        </div>
        {postDetail ? (
          <div className="h-full border border-[#afafaf] rounded-[12px]">
            <div className="w-full h-[8%] py-[10px] px-[20px] flex justify-between items-center border-b border-[#afafaf]">
              <div>{postDetail.userName}</div>
              <div>{postDetail.createdAt}</div>
            </div>
            <div className="w-full h-[50%] p-[20px]">{postDetail.content}</div>
            <div className="w-full h-[50%] ">
              <div className="h-[55%] flex justify-center items-center">
                <Textarea width="[100%]" height="[100%]" />
                <Button
                  theme="white"
                  width={80}
                  height={175}
                  color="#566270 "
                  state="default"
                >
                  완료
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
