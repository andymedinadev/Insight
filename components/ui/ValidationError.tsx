import Image from 'next/image';

import { Xerror } from '@/public';

interface ValidationErrorProps {
  label: string;
}

export function ValidationError({ label }: ValidationErrorProps) {
  return (
    <div className="flex w-full items-center gap-1 rounded py-1">
      <div className="h-5 w-5">
        <Image className="h-5 w-5" src={Xerror} alt="errorOctagon" />
      </div>
      <span className="mt-0.5 font-['Roboto'] text-sm leading-tight font-semibold text-[#C73A3A]">
        {label}
      </span>
    </div>
  );
}
