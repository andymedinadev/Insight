import Image from 'next/image';

import { BackgroundLogin } from '@/public';

export function LoginIllustration() {
  return (
    <div className="relative hidden md:block">
      <Image
        priority
        className="fixed h-full w-full object-fill md:max-w-[720px] 2xl:max-w-[990px]"
        src={BackgroundLogin}
        alt="Login page Background"
      />
    </div>
  );
}
