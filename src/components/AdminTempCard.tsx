interface AdminTempCardProps {
  id: string;
  title: string;
  content: string;
  isSelected: boolean;
  imageUrls: string[]; // 추가
  onSelect: () => void;
}

export default function AdminTempCard({
  title,
  content,
  isSelected,
  imageUrls,
  onSelect,
}: AdminTempCardProps) {
  return (
    <div className="flex">
      <div className="w-[80%] h-[200px] flex flex-col gap-[10px] py-[10px] px-[30px] border border-[#afafaf] rounded-[12px]">
        <div>
          <span>{title}</span>
        </div>
        <div className="flex overflow-x-scroll gap-[10px]">
          {(imageUrls?.length ?? 0) > 0 ? (
            imageUrls.map((url, index) => (
              <div
                key={index}
                className="w-[100px] h-[70px] flex-shrink-0 border"
              >
                <img
                  src={url}
                  alt={`템플릿 이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="w-[100px] h-[70px] flex-shrink-0 border flex items-center justify-center">
              이미지 없음
            </div>
          )}
        </div>

        <div>{content}</div>
      </div>
      <div className="w-[20%] h-[200px] flex justify-center items-center">
        <input
          className="w-[30px] h-[30px]"
          type="radio"
          checked={isSelected}
          onChange={onSelect}
        />
      </div>
    </div>
  );
}
