'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type ChatListItem = {
  _id: string;
  userName: string;
  lastMessage: string;
  createdAt: Date;
};

type Message = {
  userId: string;
  userName?: string;
  reciever: string | null;
  message: string;
};

const ChatBox = () => {
  const [isShowChat, setIsShowChat] = useState(false);
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data } = useSession();
  const isAdmin = data?.user?.admin || false;
  const userId = data?.user?.userId || '';

  useEffect(() => {
    if (isAdmin) {
      fetch('/api/chat/list')
        .then((res) => res.json())
        .then(setChatList);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) {
      fetch(`/api/chat?userId=${userId}&reciever=codiee`)
        .then((res) => res.json())
        .then(setMessages);
    }
  }, [userId, isAdmin]);

  useEffect(() => {
    if (isAdmin && selectedUser) {
      fetch(`/api/chat?userId=${selectedUser}&reciever=${userId}`)
        .then((res) => res.json())
        .then(setMessages);
    }
  }, [selectedUser, userId, isAdmin]);

  const sendMessage = async () => {
    if (!message.trim()) {
      console.error('메시지 전송 실패: 메시지가 비어 있습니다.');
      return;
    }

    const newMessage = {
      userId,
      userName: data?.user?.name || '익명',
      reciever: isAdmin ? selectedUser : 'codiee',
      message,
    };

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    });

    if (!res.ok) {
      console.error('메시지 전송 실패');
      return;
    }

    const savedMessage = await res.json();
    setMessages((prev) => [...prev, savedMessage]);
    setMessage('');
  };

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
            onClick={() => setIsShowChat(false)}
            className="flex items-center cursor-pointer"
          >
            Back
          </div>
        )}
      </div>

      {(isShowChat && isAdmin) || !isAdmin ? (
        <div>
          <div className="h-[280px] p-[10px] flex-col overflow-y-scroll">
            {messages.map((chat, idx) => (
              <div
                key={idx}
                className={chat.userId === userId ? 'text-end' : 'text-start'}
              >
                <span className="px-[5px] border border-[#afafaf] rounded-[12px]">
                  {chat.message}
                </span>
              </div>
            ))}
          </div>
          <div className="flex h-[40px]">
            <input
              className="w-[80%] border border-[#afafaf] outline-0"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="w-[20%]">
              전송
            </button>
          </div>
        </div>
      ) : (
        isAdmin && (
          <div className="h-[320px] flex-col overflow-y-scroll">
            {chatList.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setSelectedUser(chat._id);
                  setIsShowChat(true);
                }}
                className="h-[40px] px-[10px] flex items-center gap-[10px] border-b border-[#afafaf] cursor-pointer"
              >
                <div className="w-[20%]">{chat.userName}</div>
                <div className="w-[80%]">{chat.lastMessage}</div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ChatBox;
