import React, { useState, KeyboardEventHandler } from 'react';

interface InputProps {
  placeholder?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  state?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  type?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

const Input = ({
  placeholder,
  width,
  height,
  borderRadius,
  value,
  onChange,
  required,
  type,
  onKeyDown,
  children,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const inputStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    borderRadius: borderRadius ? `${borderRadius}px` : '8px',
  };

  return (
    <div>
      <input
        type={type}
        style={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={`p-2 outline-none transition-colors ${
          isFocus
            ? 'border-2 border-lightPurple'
            : 'border-2 border-neutralGray'
        }`}
        required={required}
        onKeyDown={onKeyDown}
      />
      {children}
    </div>
  );
};

export default Input;
