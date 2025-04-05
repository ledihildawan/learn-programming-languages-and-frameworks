'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ReactQueryProvider from '@/lib/react-query';

export default function NoteLayout({ children }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
          </header>
          <div className="p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
