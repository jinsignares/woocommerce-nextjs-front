'use client';

import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { SessionProvider } from 'next-auth/react';

type Props = {};

const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex h-full w-full flex-col">{children}</div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default ClientProvider;
