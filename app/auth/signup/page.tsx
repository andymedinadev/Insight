import { SignupForm, SignupHeader, SignupIllustration, SignupLogo } from '@/components';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-stretch justify-center overflow-hidden bg-white 2xl:items-start">
      <div className="flex h-full w-full flex-col lg:h-full lg:w-1/2 lg:flex-row 2xl:mt-10">
        <SignupLogo />
        <div className="flex h-full w-full flex-col justify-center bg-white p-5 pt-0 pb-10 lg:mt-10 lg:ml-24 2xl:pl-32">
          <SignupHeader />
          <SignupForm />
        </div>
      </div>
      <SignupIllustration />
    </div>
  );
}
