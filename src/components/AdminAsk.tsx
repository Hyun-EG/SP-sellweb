'use client';

import { useState, useEffect } from 'react';
import AdminAskModal from '@/components/AdminAskModal';

interface PostType {
  _id: string;
  userName: string;
  title: string;
  createdAt: string;
}

export default function AdminAsk() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/get-posts?unanswered=true');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setIsOpen(true);
  };

  return (
    <div className="w-[80%] h-[350px] overflow-y-scroll flex flex-col py-[10px]">
      <div className="h-[50px] pb-[10px] flex">
        <div className="w-[15.3%] flex justify-center items-center border border-r-0 border-[#afafaf]">
          이름
        </div>
        <div className="w-[59.3%] flex justify-center items-center border border-r-0 border-[#afafaf]">
          문의 제목
        </div>
        <div className="w-[25.3%] flex justify-center items-center border border-[#afafaf]">
          문의 날짜
        </div>
      </div>
      {posts.map((item) => (
        <div
          key={item._id.toString()}
          onClick={() => handlePostClick(item._id.toString())}
        >
          <div className="h-[50px] flex cursor-pointer hover:bg-gray-100">
            <div className="w-[15.3%] flex justify-center items-center border-b border-[#afafaf]">
              {item.userName}
            </div>
            <div className="w-[59.3%] flex justify-center items-center border-b border-[#afafaf]">
              {item.title}
            </div>
            <div className="w-[25.3%] flex justify-center items-center border-b border-[#afafaf]">
              {item.createdAt}
            </div>
          </div>
        </div>
      ))}

      {isOpen && selectedPostId && (
        <AdminAskModal
          postId={selectedPostId}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
