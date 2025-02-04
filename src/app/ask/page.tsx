import Button from '@/components/Button';
import Input from '@/components/Input';
import TitleBox from '@/components/TitleBox';

export default function Ask() {
  return (
    <div>
      <TitleBox title="1:1 고객문의" />
      <div className="h-[80px] flex items-center">
        필요하신 문의를 남겨주세요. 빠른 시일내에 답변 드리겠습니다.
      </div>
      <div className="h-[80px] flex border-[#afafaf] border border-b-0">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          이름
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          data.name
        </div>
      </div>
      <div className="h-[80px] flex border-[#afafaf] border border-b-0">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          이메일
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          data.email
        </div>
      </div>
      <div className="h-[80px] flex border-[#afafaf] border border-b-0">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          핸드폰
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          data.phone
        </div>
      </div>
      <div className="h-[80px] flex border-[#afafaf] border border-b-0">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          제목
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          <Input width={1010} height={40} />
        </div>
      </div>
      <div className="h-[80px] flex border-[#afafaf] border border-b-0">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          내용
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          <Input width={1010} height={40} />
        </div>
      </div>
      <div className="h-[80px] flex border-[#afafaf] border">
        <div className="w-[150px] flex justify-center items-center border-r border-[#afafaf] bg-[#F4F4F4]">
          첨부파일
        </div>
        <div className="w-[1050px] px-[10px] flex justify-start items-center">
          <input type="file" />
        </div>
      </div>
      <div className="h-[120px] flex justify-end items-center gap-[10px]">
        <Button width={80} height={40} state="white" color="#566270">
          등록
        </Button>
        <Button
          width={80}
          height={40}
          state="white"
          color="white"
          fontColor="black"
        >
          취소
        </Button>
      </div>
    </div>
  );
}
