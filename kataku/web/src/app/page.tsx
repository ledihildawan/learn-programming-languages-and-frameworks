import { Button } from "@/components/ui/button";
import { env } from "@/env/client";

export default function Home() {
  return (
    <div>
      <Button>Click me ({env.NEXT_PUBLIC_SERVER_URL})</Button>
    </div>
  );
}
