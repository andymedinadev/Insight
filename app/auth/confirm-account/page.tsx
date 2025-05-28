'use client';

import { useState } from 'react';

import { useConfirmCode } from '@/hooks/useConfirmCode';
import {
  SuccessConfirm,
  ConfirmForm,
  ConfirmHeader,
  ConfirmIllustration,
  ConfirmLogo,
} from '@/components';

function ConfirmAccountPage() {
  const [confirmed, setConfirmed] = useState(false);

  const { code, isComplete, isLoading, handleChange, handleSubmit } = useConfirmCode(() =>
    setConfirmed(true)
  );

  if (confirmed) return <SuccessConfirm />;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ConfirmLogo />
      <div className="grid h-full w-full grid-cols-1 px-6 md:h-screen md:grid-cols-2 lg:mt-0">
        <div className="flex h-full flex-col items-center justify-center bg-white lg:m-auto lg:block lg:w-[470px] 2xl:pt-20">
          <ConfirmHeader />
          <ConfirmForm
            code={code}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isComplete={isComplete}
            isLoading={isLoading}
          />
        </div>
        <ConfirmIllustration />
      </div>
    </div>
  );
}

export default ConfirmAccountPage;
