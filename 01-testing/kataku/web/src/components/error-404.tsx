"use client";

import { updateNotFoundDashboard } from "@/store/dashboard-store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Error404() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const back = () => {
    setIsLoading(true);
    updateNotFoundDashboard(false);

    router.back();
  };

  return (
    <div className="bg-background flex min-h-[100dvh] flex-col items-center justify-center">
      <div className="relative w-full max-w-md overflow-hidden">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div className="grid grid-cols-[repeat(3,1fr)] gap-2">
            <div className="text-primary text-9xl font-bold">4</div>
            <div className="text-primary text-9xl font-bold">0</div>
            <div className="text-primary text-9xl font-bold">4</div>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-md text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            Not Found
          </h1>
          <p className="text-muted-foreground mt-4">
            The page you’re looking for doesn’t exist.
          </p>
          <div className="mt-6">
            <Button onClick={back} disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              <span>Go Back</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
