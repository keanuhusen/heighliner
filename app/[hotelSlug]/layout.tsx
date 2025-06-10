import type { ReactNode } from 'react';
import Navbar from '../../components/Navbar';

export default function HotelLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
