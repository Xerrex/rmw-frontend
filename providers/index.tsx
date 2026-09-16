'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster position='bottom-right'/>
      </ThemeProvider>
    </QueryProvider>
  );
}
