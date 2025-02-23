'use client';

import { SWRConfig } from 'swr';

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig 
      value={{
        refreshInterval: 0,
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
} 