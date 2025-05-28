import Image from 'next/image';

import { Logo as InsightLogo } from '@/public';

// Este logo se muestra solo en mobile. El logo para desktop está en <SignupHeader />
export function SignupLogo() {
  return (
    <div className="mt-14 mb-16 ml-32 px-3 text-center lg:hidden">
      <Image src={InsightLogo} width={110} height={34} alt="Insight Logo" />
    </div>
  );
}
