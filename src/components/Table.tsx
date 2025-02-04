export default function Table() {
  return (
    <div className="flex flex-col">
      <div className="w-[1200px] h-[100px] flex bg-[#F4F4F4] border-b border-[#afafaf]">
        <div className="w-[100px] flex justify-center items-center border-r border-[#afafaf]">
          번호
        </div>
        <div className="w-[900px] flex justify-center items-center border-r border-[#afafaf]">
          제목
        </div>
        <div className="w-[200px] flex justify-center items-center">
          등록 날짜
        </div>
      </div>
      <div className="w-[1200px] h-[100px] flex border-b border-[#afafaf]">
        <div className="w-[100px] flex justify-center items-center ">
          data.id
        </div>
        <div className="w-[900px] px-[20px] flex justify-start items-center ">
          data.title
        </div>
        <div className="w-[200px] flex justify-center items-center">
          data.date
        </div>
      </div>
      <div>페이지네이션</div>
    </div>
  );
}
