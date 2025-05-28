import Image from 'next/image';

import { Logo as InsightLogo } from '@/public';

export function ConfirmLogo() {
  return (
    <>
      <div className="mt-14 mb-28 flex w-full justify-center px-3 md:hidden">
        <Image
          src={InsightLogo}
          alt="InsightLogo"
          width={110}
          height={34}
          className="object-contain"
        />
      </div>
    </>
  );
}
