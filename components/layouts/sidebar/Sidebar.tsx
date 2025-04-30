import { DashboardLinks } from '@/components';

export default function Sidebar() {
  return (
    <aside className="hidden lg:z-30 lg:flex lg:h-full lg:w-64 lg:flex-col lg:gap-4 lg:border-r lg:bg-white lg:p-6 lg:shadow">
<<<<<<< HEAD
      <h1 className="lg:mb-20 lg:text-xl lg:font-semibold">INSIGHT</h1>
      <DashboardLinks />
=======
      <h1 className="lg:mb-24 lg:text-xl lg:font-semibold">INSIGHT</h1>
      <Link href="/dashboard/home" className="hover:underline">
        Inicio
      </Link>
      <Link href="/dashboard/profile" className="hover:underline">
        Perfil
      </Link>
      <Link href="/dashboard/patientlist" className="hover:underline">
        Listado de pacientes
      </Link>
      <Link href="/dashboard/newpatient" className="hover:underline">
        Nuevo paciente
      </Link>
      <Link href="/dashboard/calendar" className="hover:underline">
        Calendario
      </Link>
      <Link href="/dashboard/support" className="hover:underline">
        Soporte
      </Link>
>>>>>>> dev-nate
    </aside>
  );
}
