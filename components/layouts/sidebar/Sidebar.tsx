import { DashboardLinks } from '@/components';
import { Logo } from '@/public';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="hidden lg:z-30 lg:flex lg:h-full lg:w-64 lg:flex-col lg:border-r lg:bg-white lg:shadow">
      <div className="lg:mt-6 lg:mb-6 lg:ml-6 lg:text-xl lg:font-semibold">
        <Link href="/dashboard/home">
          <Image src={Logo} alt="Logo" />
        </Link>
      </div>
      <DashboardLinks />
    </aside>
  );
}
