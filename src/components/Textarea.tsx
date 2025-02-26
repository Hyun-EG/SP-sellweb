interface TextareaProps {
  width: string;
  height: string;
  borderRadius?: string;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export default function Textarea({
  width,
  height,
  borderRadius,
  onClick,
  onChange,
  value,
  onKeyDown,
}: TextareaProps) {
  return (
    <textarea
      placeholder="답글을 입력해주세요"
      onClick={onClick}
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
      className={`w-${width} h-${height} p-[10px] border border-l-0 border-[#afafaf] rounded-${borderRadius} resize-none outline-none`}
    />
  );
}
