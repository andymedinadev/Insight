import Link from 'next/link';
import { IconType } from 'react-icons';

interface ButtonCardsProps {
  href: string;
  icon: IconType;
  title: string;
  description: string;
}

export default function ButtonCards({ href, icon: Icon, title, description }: ButtonCardsProps) {
  return (
    <Link href={href}>
      <div className="flex h-24 w-80 flex-row items-center gap-4 rounded-lg bg-zinc-100 p-4 shadow-md transition hover:scale-105">
        <div className="text-3xl text-black">
          <Icon />
        </div>
        <div>
          <h1 className="text-base font-semibold text-black">{title}</h1>
          <p className="text-sm font-normal text-black">{description}</p>
        </div>
      </div>
    </Link>
  );
}
