interface AdminTempCardProps {
  title: string;
  content: string;
}

export default function AdminTempCard({ title, content }: AdminTempCardProps) {
  return (
    <div className="flex">
      <div
        className={`w-[80%] h-[200px] flex flex-col gap-[10px] py-[10px] px-[30px] border border-[#afafaf] rounded-[12px]`}
      >
        <div>
          <span>{title}</span>
        </div>
        <div className="flex gap-[10px]">
          <div className="w-[100px] h-[70px] border">이미지</div>
          <div className="w-[100px] h-[70px] border">이미지</div>
        </div>
        <div>{content}</div>
      </div>
      <div className={`w-[20%] h-[200px]] flex justify-center items-center`}>
        <input className="w-[30px] h-[30px]" type="radio" />
      </div>
    </div>
  );
}
