import React from 'react';
import { ThemeProvider } from './ThemeProvider';

type Props = {};

const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default ClientProvider;
