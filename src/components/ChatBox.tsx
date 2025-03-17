'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

const ChatBox = () => {
  const [isShowChat, setIsShowChat] = useState(false);
  const { data } = useSession();
  const isAdmin = data?.user?.admin || false;
  return (
    <div className="fixed top-[250px] right-[130px] w-[300px] h-[400px] p-[10px] border border-[#afafaf] rounded-[12px] bg-white">
      <div className="h-[60px] pb-[10px] flex justify-between border-b border-[#afafaf]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[50px] h-[50px] flex justify-center items-center border-[#afafaf] border rounded-[50%] text-[12px]">
            SellWeb
          </div>
          <div>셀웹</div>
        </div>
        {isAdmin && isShowChat && (
          <div
            onClick={() => {
              setIsShowChat(false);
            }}
            className="flex items-center cursor-pointer"
          >
            Back
          </div>
        )}
      </div>
      {(isShowChat && isAdmin) || !isAdmin ? (
        <div>
          <div className="h-[280px] p-[10px] flex-col">
            <div className="text-start">
              <span className="px-[5px] border border-[#afafaf] rounded-[12px]">
                상대 채팅 내용
              </span>
            </div>
            <div className="text-end">
              <span className="px-[5px] border border-[#afafaf] rounded-[12px]">
                내 채팅 내용
              </span>
            </div>
          </div>
          <div className="flex h-[40px]">
            <input
              className="w-[80%] border border-[#afafaf] outline-0"
              type="text"
            />
            <button className="w-[20%]">전송</button>
          </div>
        </div>
      ) : (
        isAdmin && (
          <div className="h-[320px] flex-col overflow-y-scroll">
            <div
              onClick={() => {
                setIsShowChat(true);
              }}
              className="h-[40px] px-[10px] flex items-center gap-[10px] border-b border-[#afafaf] cursor-pointer"
            >
              <div className="w-[20%]">박성현</div>
              <div className="w-[80%]">카톡보냅니다</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ChatBox;
