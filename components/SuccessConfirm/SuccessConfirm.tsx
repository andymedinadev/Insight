import { ConfirmIllustration, ConfirmLogo, SuccessForm } from '@/components';

export function SuccessConfirm() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <ConfirmLogo />
      <div className="mt-0 grid h-full w-full grid-cols-1 px-6 md:h-screen md:grid-cols-2">
        <SuccessForm />
        <ConfirmIllustration />
      </div>
    </div>
  );
}
