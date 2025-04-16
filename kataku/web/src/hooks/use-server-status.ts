import { queryClient } from "@/components/query-provider";
import { env } from "@/env/client";
import { useQuery } from "@tanstack/react-query";

export const useServerStatus = () => {
  const { isError, isPending } = useQuery({
    queryFn: async () => {
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}/status`);

        if (!response.ok) {
          throw new Error("Server is down");
        }

        return response.json();
      } catch (error) {
        queryClient.setQueryData(["serverStatus"], null);
      }
    },
    retry: 3,
    queryKey: ["serverStatus"],
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
    refetchInterval: 30000,
  });

  return {
    isError,
    isPending,
  };
};
