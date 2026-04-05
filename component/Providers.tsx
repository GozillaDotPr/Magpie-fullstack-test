'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ReactNode, useMemo } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const theme = useMemo(() => createTheme({
    palette: {
      mode: 'dark',
    },
  }), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}