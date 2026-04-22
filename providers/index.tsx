'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
