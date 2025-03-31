interface AlertModalType {
  title: string;
  content: string;
  btnName: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AlertModal = ({ title, content, btnName, onClick }: AlertModalType) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-96 h-52 p-4 rounded-lg bg-white shadow-lg">
        <div className="w-full h-12 flex justify-center items-center">
          <span className="text-b text-2xl">{title}</span>
        </div>
        <div className="w-full h-20 flex justify-center items-center">
          <span className="text-base text-[#afafaf]">{content}</span>
        </div>
        <div className="w-full h-12 flex justify-center items-center">
          <button
            onClick={onClick}
            className="w-full h-8 bg-[#db2777] rounded-xl text-xl text-white"
          >
            {btnName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
