"use client";

import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    updateBreadcrumbs("/dashboard/audit-logs/details");
  }, []);

  return (
    <div className="gap-6 px-4 lg:px-6">
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        quibusdam et perspiciatis labore in iusto, alias facilis molestiae
        voluptatum, aut fuga veritatis id eaque! Non, laborum quis! Sint,
        consectetur amet.
      </h1>
    </div>
  );
}
