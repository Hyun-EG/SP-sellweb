'use client';

import React, { useState } from 'react';

type InputState = 'sucess' | 'danger' | 'focus' | 'default';

type InputProps = {
  children?: React.ReactNode;
  placeholder?: string;
  state?: InputState;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
};

const Input = ({ placeholder, width, height, borderRadius }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const inputStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    borderRadius: borderRadius ? `${borderRadius}px` : '8px',
  };

  // valid 체크기능 추후 추가 예정

  return (
    <>
      <input
        type="text"
        style={inputStyle}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={`p-2 outline-none transition-colors ${
          isFocus
            ? 'border-2 border-lightPurple'
            : 'border-2 border-neutralGray'
        }`}
      />
    </>
  );
};

export default Input;
