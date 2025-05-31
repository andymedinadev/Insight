'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  ChangePasswordOldStep,
  ChangePasswordSuccessStep,
  ChangePasswordNewStep,
} from '@/components';
import { ArrowBack } from '@/public';
import type { ChangePasswordPayload } from '@/types';

export function ChangePasswordWizard() {
  const [step, setStep] = useState<'currentPassword' | 'new-password' | 'success'>(
    'currentPassword'
  );
  const [payload, setPayload] = useState<ChangePasswordPayload>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  return (
    <>
      {(step === 'currentPassword' || step === 'new-password') && (
        <div className="ml-4 self-start lg:ml-0">
          <Link
            href={'/dashboard/profile'}
            className="mb-7 flex h-10 w-24 items-center gap-[12px] lg:mb-14"
          >
            <Image
              src={ArrowBack}
              width={24}
              height={24}
              alt="Flecha Atrás"
              className="lg:hidden"
            />
            <Image
              src={ArrowBack}
              width={40}
              height={40}
              alt="Flecha Atrás"
              className="hidden lg:block"
            />
            <span className="justify-start font-['Roboto'] text-sm leading-normal font-normal text-blue-700 underline lg:text-base">
              Volver
            </span>
          </Link>
        </div>
      )}
      <div>
        {step === 'currentPassword' && (
          <ChangePasswordOldStep
            onNext={(currentPassword) => {
              setPayload({ ...payload, currentPassword });
              setStep('new-password');
            }}
          />
        )}
        {step === 'new-password' && (
          <ChangePasswordNewStep
            payload={payload}
            onNext={(payload) => {
              setPayload({ ...payload });
              setStep('success');
            }}
          />
        )}
        {step === 'success' && <ChangePasswordSuccessStep newPassword={payload.newPassword} />}
      </div>
    </>
  );
}
