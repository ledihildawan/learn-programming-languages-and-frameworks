"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
            <button
              onClick={() => router.back()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
