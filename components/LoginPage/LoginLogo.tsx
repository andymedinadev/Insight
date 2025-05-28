import Image from 'next/image';

import { Logo as InsightLogo } from '@/public';

export function LoginLogo() {
  return (
    <div className="mt-4 mb-16 flex justify-center md:mb-12 md:justify-start">
      <div className="relative h-[33px] w-[109px] md:h-[47px] md:w-[150px]">
        <Image src={InsightLogo} alt="InsightLogo" fill className="object-contain" />
      </div>
    </div>
  );
}
