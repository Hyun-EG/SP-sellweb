import React from 'react';

type StyleProps = {
  width: string;
  backgroundColor: string;
  color: string;
  content: string;
  fontSize: string;
};

const Badge = ({
  width,
  backgroundColor,
  content,
  color,
  fontSize,
}: StyleProps) => {
  return (
    <div
      className="flex h-0.9375 justify-center items-center rounded-sm"
      style={{ width, backgroundColor, color, fontSize }}
    >
      {content}
    </div>
  );
};

export default Badge;
