import React from 'react';

type TitleProps = {
  title: string;
};

const TitleBox = ({ title }: TitleProps) => {
  return (
    <div className="w-full h-[80px] p-[10px] flex justify-start items-center text-[24px]  border-b border-[#afafaf]">
      {title}
    </div>
  );
};

export default TitleBox;
