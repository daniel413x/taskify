import { Children } from '@/lib/types';
import Navbar from './_components/Navbar';

interface DashboardLayoutProps {
  children: Children;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => (
  <div className="h-full">
    <Navbar />
    {children}
  </div>
);

export default DashboardLayout;
