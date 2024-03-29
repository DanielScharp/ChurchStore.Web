import './global.css'

import { RouterProvider } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner'

import { router } from './routes';
import { ThemeProvider } from './components/theme/theme-provider';
import { queryClient } from './lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

export function App() {

  return (
    <HelmetProvider>
      <ThemeProvider storageKey="churchStore-theme" defaultTheme='dark'>
        <Helmet titleTemplate='%s | ChurchStore' />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
