import { DashboardLinks } from '@/components';
import { Logo } from '@/public';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside className="hidden lg:z-30 lg:flex lg:h-full lg:w-64 lg:flex-col lg:border-r lg:border-[#E6E8F0] lg:bg-white lg:shadow">
      <div className="lg:mt-6 lg:mb-6 lg:ml-6 lg:text-xl lg:font-semibold">
        <Image src={Logo} alt="Logo" />
      </div>
      <DashboardLinks />
    </aside>
  );
}
