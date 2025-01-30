export default function AuthModal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-dvh flex justify-center items-center bg-[rgb(0,0,0,0.5)] ">
      <div className="w-[400px] h-[500px] py-[5px] px-[20px] border-[#afafaf] border rounded-[12px] bg-white">
        {children}
      </div>
    </div>
  );
}
