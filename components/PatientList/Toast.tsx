'use client';

import { Info } from '@/public';
import Image from 'next/image';
import { useEffect } from 'react';

type Props = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`boder-r fixed top-24 right-16 z-[100] rounded-lg border-l-4 border-[#458FB9] px-4 py-2 text-2xl leading-7 font-semibold text-[#18263D] shadow-md transition-all duration-300 ${
        type === 'success' ? 'bg-[#F4FBFF]' : 'bg-[#F4FBFF]'
      }`}
    >
      <div className="flex w-full flex-row items-center gap-2">
        <div>
          <Image src={Info} alt="Informacion" height={24} width={24} />
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}
