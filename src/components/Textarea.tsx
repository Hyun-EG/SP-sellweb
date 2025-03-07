interface TextareaProps {
  width: string;
  height: string;
  borderRadius?: string;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
  // eslint-disable-next-line no-unused-vars
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
  placeholder,
}: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
      className={`w-${width} h-${height} p-[10px] border border-[#afafaf] rounded-${borderRadius} resize-none outline-none`}
    />
  );
}
