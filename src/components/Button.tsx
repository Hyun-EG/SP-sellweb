'use client';

import React from 'react';

type ButtonState = 'white' | 'dark';

type ButtonProps = {
  type?: 'button';
  children?: React.ReactNode;
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
  state: ButtonState;
};

const Button = ({ width, height, children }: ButtonProps) => {
  const buttonStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
  };
  return (
    <button
      type="button"
      style={buttonStyle}
      className="font-semibold rounded-lg shadow-md text-white bg-slateGray border border-neutralGray"
    >
      {children}
    </button>
  );
};

export default Button;
