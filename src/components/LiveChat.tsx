const LiveChat = () => {
  return (
    <div className="w-[300px] h-[400px] px-[20px] py-[10px] rounded-[12px] bg-[white]">
      <div className="w-[260px] h-[60px] flex border-b border-[#afafaf]">
        <div className="w-[130px] h-[60px] pb-[10px] flex justify-start items-center ">
          <div className="w-[40px] h-[40px] flex justify-center items-center border border-[#afafaf] rounded-full cursor-pointer"></div>
          <div className="text-black text-[20px] font-bold ml-[5px]">셀웹</div>
        </div>
        <div className="w-[130px] h-[60px] "></div>
      </div>
      <div className="w-[260px] h-[280px] py-[10px] text-black">
        메세지 내용
      </div>
      <div className="w-[260px] h-[40px] flex">
        <input className="w-[200px] h-[40px] pl-[5px] border border-[#AFAFAF] rounded-l-[12px] outline-0 text-black text-[12px]"></input>
        <div className="w-[60px] h-[40px] flex justify-center items-center border border-[#AFAFAF] rounded-r-[12px] border-l-0 text-black cursor-pointer">
          전송
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
