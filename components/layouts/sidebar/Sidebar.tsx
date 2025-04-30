import { DashboardLinks } from '@/components';

export default function Sidebar() {
  return (
    <aside className="hidden lg:z-30 lg:flex lg:h-full lg:w-64 lg:flex-col lg:gap-4 lg:border-r lg:bg-white lg:p-6 lg:shadow">
      <h1 className="lg:mb-20 lg:text-xl lg:font-semibold">INSIGHT</h1>
      <DashboardLinks />
    </aside>
  );
}
