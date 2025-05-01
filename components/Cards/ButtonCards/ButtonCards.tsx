import Link from 'next/link';
import { TypesCardButtons } from '@/types';

export default function ButtonCards({ href, icon, title, description }: TypesCardButtons) {
  return (
    <Link href={href}>
      <div className="flex h-24 w-80 flex-row items-center gap-4 rounded-lg bg-zinc-100 p-4 shadow-md lg:h-48 lg:w-80 lg:flex-col lg:items-start lg:gap-0 lg:p-0">
        <div className="text-2xl lg:mt-8 lg:mb-2 lg:ml-10">{icon}</div>
        <div className="lg:mr-10 lg:ml-10">
          <h1 className="text-sm font-semibold text-black lg:mb-3 lg:text-lg">{title}</h1>
          <p className="text-xs font-normal text-black lg:text-base">{description}</p>
        </div>
      </div>
    </Link>
  );
}
