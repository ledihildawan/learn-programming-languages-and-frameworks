export default function Error500() {
  return (
    <div className="bg-background flex min-h-[100dvh] flex-col items-center justify-center">
      <div className="relative w-full max-w-md overflow-hidden">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div className="grid grid-cols-[repeat(3,1fr)] gap-2">
            <div className="text-primary text-9xl font-bold">5</div>
            <div className="text-primary text-9xl font-bold">0</div>
            <div className="text-primary text-9xl font-bold">0</div>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-md text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
            Internal Server Error
          </h1>
          <p className="text-muted-foreground mt-4">
            Page will auto-recover once the server is back.
          </p>
        </div>
      </div>
    </div>
  );
}
