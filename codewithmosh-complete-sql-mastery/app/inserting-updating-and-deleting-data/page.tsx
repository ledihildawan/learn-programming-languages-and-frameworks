import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { unstable_ViewTransition as ViewTransition } from "react";
import FormInsertCustomer from "./components/form-insert-customer";

export default async function InsertingUpdatingAndDeletingData() {
  return (
    <ViewTransition>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Retrieving Data From Multipe Tables</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="p-4">
        <FormInsertCustomer />

        {/* <Button>jfasklfjdsalk</Button> */}
      </main>
    </ViewTransition>
  );
}
