import Link from 'next/link';
import { TypesCardButtons } from '@/types';
import Image from 'next/image';

export default function ButtonCards({ href, icon, title, description }: TypesCardButtons) {
  return (
    <Link href={href}>
      <div className="flex h-44 w-80 flex-col items-start gap-4 rounded-2xl border border-[#E6E8F0] p-4 shadow-md lg:h-52 lg:w-[348px] lg:flex-col lg:gap-0 lg:p-0">
        <div className="mt-4 flex rounded-full bg-orange-100 p-3 lg:mt-8 lg:mb-7 lg:ml-8">
          <Image src={icon} alt="Icon" width={24} height={24} />
        </div>

        <div className="lg:mr-10 lg:ml-8">
          <h1 className="mb-1.5 text-xl leading-7 font-semibold text-[#000F27E5] lg:mb-2 lg:text-2xl">
            {title}
          </h1>
          <p className="text-sm leading-normal font-normal text-black lg:text-base">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
