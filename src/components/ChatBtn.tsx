type ChatBtnStyleProps = {
  backgroundColor: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const ChatBtn = ({ backgroundColor, onClick }: ChatBtnStyleProps) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor }}
      className="w-[70px] h-[70px] flex justify-center items-center rounded-full text=[32px] cursor-pointer"
    >
      이미지 넣을 자리
    </div>
  );
};

export default ChatBtn;
