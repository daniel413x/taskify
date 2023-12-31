import { Children } from '@/lib/types';
import Navbar from './_components/Navbar';
import Footer from './_components/Footer';

interface MarketingLayoutProps {
  children: Children;
}

const MarketingLayout = ({
  children,
}: MarketingLayoutProps) => (
  <div className="h-full bg-slate-100">
    <Navbar />
    <main className="pt-40 pb-20 bg-slate-100">
      {children}
    </main>
    <Footer />
  </div>
);

export default MarketingLayout;
