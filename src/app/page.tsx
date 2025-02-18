import Image from 'next/image';
import meetBg from '../../public/bgs/bg-sellweb-1.webp';

export default function Page() {
  return (
    <div className="h-full">
      <Image src={meetBg} alt="bg" />
    </div>
  );
}
