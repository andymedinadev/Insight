import Link from 'next/link';
import { TypesCardButtons } from '@/types';

export default function ButtonCards({ href, icon, title, description }: TypesCardButtons) {
  return (
    <Link href={href}>
      <div className="flex h-24 w-80 flex-row items-center gap-4 rounded-lg bg-zinc-100 p-4 shadow-md">
        <div className="text-2xl">{icon}</div>
        <div>
          <h1 className="text-sm font-semibold text-black">{title}</h1>
          <p className="text-xs font-normal text-black">{description}</p>
        </div>
      </div>
    </Link>
  );
}
