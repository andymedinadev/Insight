import { DashboardLinks } from '@/components';

export default function Sidebar() {
  return (
    <aside className="hidden lg:z-30 lg:flex lg:h-full lg:w-64 lg:flex-col lg:border-r lg:bg-white lg:shadow">
      <h1 className="lg:mt-6 lg:mb-6 lg:ml-6 lg:text-xl lg:font-semibold">INSIGHT</h1>
      <DashboardLinks />
    </aside>
  );
}
