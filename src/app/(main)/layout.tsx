import type { PropsWithChildren } from 'react';
import { Navigation } from './_components/navigation';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex h-full'>
      <Navigation.Provider>
        <Navigation.Sidebar />
        <div className='flex flex-col flex-1'>
          <Navigation.Header />
          <div className='flex-1 scroll-pt-11 overflow-y-auto'>{children}</div>
        </div>
      </Navigation.Provider>
    </div>
  );
}
