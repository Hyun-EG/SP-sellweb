'use client';

const BackToTop = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="fixed top-[700px] right-[50px] w-[70px] h-[70px] flex justify-center items-center text-[32px] rounded-full cursor-pointer bg-[#566270]"
    >
      <span className="text-[#fff]">▲</span>
    </div>
  );
};

export default BackToTop;
