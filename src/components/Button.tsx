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
  color?: string;
  fontColor?: string;
};

const Button = ({
  width,
  height,
  color,
  state,
  fontColor,
  children,
}: ButtonProps) => {
  const defaultColors: Record<ButtonState, string> = {
    white: '#A593E0',
    dark: '#708090',
  };

  const buttonStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    backgroundColor: color || defaultColors[state],
    color: fontColor || '#FFFFFF',
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      className="font-semibold rounded-lg shadow-md border border-neutralGray"
    >
      {children}
    </button>
  );
};

export default Button;
