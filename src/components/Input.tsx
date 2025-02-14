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
  value?: string;
  required?: boolean;
  type?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  placeholder,
  width,
  height,
  borderRadius,
  value,
  onChange,
  required,
  type,
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const inputStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    borderRadius: borderRadius ? `${borderRadius}px` : '8px',
  };

  return (
    <input
      type={type}
      style={inputStyle}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      className={`p-2 outline-none transition-colors ${
        isFocus ? 'border-2 border-lightPurple' : 'border-2 border-neutralGray'
      }`}
      required={required}
    />
  );
};

export default Input;
