'use client';

import Image from 'next/image';
import iconChatWhite from '../../public/svgs/icon-chat(D).svg';
import ChatBox from './ChatBox';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type ChatBtnStyleProps = {
  backgroundColor: string;
};

const ChatBtn = ({ backgroundColor }: ChatBtnStyleProps) => {
  const [chatIsShow, setChatIsShow] = useState(false);
  const { data } = useSession();
  const loginStatus = data?.user || false;

  useEffect(() => {
    if (!data) {
      setChatIsShow(false);
    }
  }, [data]);
  return (
    <div>
      <div
        onClick={() => {
          if (loginStatus) {
            setChatIsShow((prev) => !prev);
          } else {
            alert('로그인이 필요합니다');
          }
        }}
        style={{ backgroundColor }}
        className="fixed top-[600px] right-[50px] w-[70px] h-[70px] flex justify-center items-center rounded-full text=[32px] cursor-pointer"
      >
        <Image src={iconChatWhite} alt="채팅 버튼" />
      </div>
      {chatIsShow && <ChatBox />}
    </div>
  );
};

export default ChatBtn;
