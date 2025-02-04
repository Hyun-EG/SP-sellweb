import Link from 'next/link';

type SubNavProps = {
  items: { label: string; href: string }[];
};

const SubNav = ({ items }: SubNavProps) => {
  return (
    <ul className="p-4 space-y-2">
      {items.map((item) => (
        <li
          key={item.href}
          className="p-2 text-black cursor-pointer hover:text-lightPurple relative after:content-[''] after:absolute after:left-11 after:bottom-0 after:w-[60%] after:h-[1px] after:bg-gray-300"
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SubNav;
