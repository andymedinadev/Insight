'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { CodeStep, EmailStep, NewPasswordStep, SuccessStep } from '@/components';
import { ArrowBack } from '@/public';
import type { ResetPasswordPayload } from '@/types';

export function Wizard() {
  const [step, setStep] = useState<'email' | 'code' | 'new-password' | 'success'>('success');
  const [payload, setPayload] = useState<ResetPasswordPayload>({
    email: '',
    code: '',
    newPassword: '',
  });

  return (
    <>
      {(step === 'email' || step === 'code') && (
        <div className="ml-4 self-start lg:ml-0">
          <Link href={'login'} className="mb-7 flex h-10 w-24 items-center gap-[12px] lg:mb-14">
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
        {step === 'email' && (
          <EmailStep
            onNext={(email) => {
              setPayload({ email, code: '', newPassword: '' });
              setStep('code');
            }}
          />
        )}
        {step === 'code' && (
          <CodeStep
            payload={payload}
            onNext={(payload: ResetPasswordPayload) => {
              setPayload(payload);
              setStep('new-password');
            }}
          />
        )}
        {step === 'new-password' && (
          <NewPasswordStep payload={payload} onNext={() => setStep('success')} />
        )}
        {step === 'success' && <SuccessStep />}
      </div>
    </>
  );
}
