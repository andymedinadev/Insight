import Link from 'next/link';
import { TypesCardButtons } from '@/types';
import Image from 'next/image';

export default function ButtonCards({ href, icon, title, description }: TypesCardButtons) {
  return (
    <Link href={href}>
      <div className="flex h-24 w-80 flex-row items-center gap-4 rounded-lg bg-zinc-100 p-4 shadow-md lg:h-48 lg:w-80 lg:flex-col lg:items-start lg:gap-0 lg:p-0">
        <div className="flex items-center justify-center rounded-full bg-orange-100 p-3 lg:mt-3 lg:mb-2 lg:ml-10">
          <Image src={icon} alt="Icon" width={40} height={40} />
        </div>

        <div className="lg:mr-10 lg:ml-10">
          <h1 className="text-sm font-semibold text-black lg:mb-3 lg:text-lg">{title}</h1>
          <p className="text-xs font-normal text-black lg:text-base">{description}</p>
        </div>
      </div>
    </Link>
  );
}
