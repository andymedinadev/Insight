import { LoginForm, LoginHeader, LoginIllustration, LoginLogo } from '@/components';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col md:grid md:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-white px-6 py-10 md:px-12 lg:px-20">
        <div className="w-full max-w-[470px]">
          <LoginLogo />
          <LoginHeader />
          <LoginForm />
        </div>
      </div>

      <LoginIllustration />
    </div>
  );
}
