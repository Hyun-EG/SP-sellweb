'use client';

import React from 'react';

type ButtonVariant = 'request' | 'confirm';
type ButtonTheme = 'white' | 'dark';
type ButtonState = 'default' | 'focus' | 'error' | 'disabled';

type ButtonProps = {
  state?: ButtonState;
  variant?: ButtonVariant;
  width?: string | number;
  height?: string | number;
  theme: ButtonTheme;
  color?: string;
  fontColor?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({
  state,
  variant,
  width,
  height,
  color,
  theme,
  fontColor,
  onClick,
  children,
}: ButtonProps) => {
  const handleClick = () => {
    if (state === 'disabled') {
      return;
    }
    if (variant === 'request') {
      alert('인증 요청');
    } else if (variant === 'confirm') {
      alert('인증 확인');
    }

    if (onClick) {
      onClick();
    }
  };

  const defaultColors: Record<ButtonTheme, string> = {
    white: '#A593E0',
    dark: '#708090',
  };

  const buttonStyle = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    backgroundColor:
      state === 'disabled' ? '#d3d3d3' : color || defaultColors[theme],
    color: state === 'disabled' ? '#F4F4F4' : fontColor || '#FFFFFF',
    opacity: state === 'disabled' ? 0.6 : 1,
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      className="font-semibold rounded-lg shadow-ㅡ border-2 border-neutralGray"
      onClick={handleClick}
      disabled={state === 'disabled'}
    >
      {children}
    </button>
  );
};

export default Button;
