import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header/Header';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
