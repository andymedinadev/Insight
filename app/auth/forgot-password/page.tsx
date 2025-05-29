import Image from 'next/image';

import { ConfirmIllustration, Wizard } from '@/components';
import { Logo as InsightLogo } from '@/public';

function ForgotPasswordPage() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col 2xl:pl-40">
        <div className="grid h-full w-full grid-cols-1 md:h-screen md:grid-cols-2 lg:mt-0">
          <div className="mx-auto mt-14 mb-12 text-center lg:hidden">
            {/* Logo Mobile */}
            <Image src={InsightLogo} width={110} height={34} alt="Insight Logo" />
          </div>

          <div className="flex h-full flex-col items-center justify-center bg-white lg:m-auto lg:mt-[71px] lg:ml-28 lg:block lg:w-[470px] 2xl:pt-20">
            {/* Logo Desktop */}
            <Image
              className="mb-14 hidden object-cover lg:block"
              src={InsightLogo}
              width={150}
              height={47}
              alt="Insight Logo"
            />
            <Wizard />
          </div>
          {/* background Desktop */}
          <ConfirmIllustration />
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
