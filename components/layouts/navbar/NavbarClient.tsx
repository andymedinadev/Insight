'use client';

import { useState } from 'react';
import { DashboardLinks } from '@/components';
import Image from 'next/image';
import { MenuMobileNavbar, IconExistNavMenu } from '@/public';

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="block lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Image src={MenuMobileNavbar} alt="Menu" width={30} height={30} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)}>
          <aside
            className="z-50 h-full w-80 bg-white p-0 shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-9 flex justify-start pt-9 pl-6">
              <Image
                src={IconExistNavMenu}
                alt="Close"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex flex-col gap-3" onClick={() => setIsOpen(false)}>
              <DashboardLinks />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
