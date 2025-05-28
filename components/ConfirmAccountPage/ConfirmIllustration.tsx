import Image from 'next/image';

import { Background } from '@/public';

export function ConfirmIllustration() {
  return (
    <div className="relative hidden w-1/2 overflow-hidden lg:block lg:max-h-[1024] lg:max-w-[720px] 2xl:max-h-[1080px] 2xl:max-w-[990px]">
      <Image
        priority
        className="fixed h-full w-full object-fill lg:max-w-[720px] 2xl:max-w-[990px]"
        src={Background}
        alt="Confirm Account Background"
      />
    </div>
  );
}
