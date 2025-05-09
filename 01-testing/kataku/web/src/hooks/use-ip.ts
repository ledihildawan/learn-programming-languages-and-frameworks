import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useIp() {
  const { data, isPending } = useQuery({
    queryKey: ["ip"],
    queryFn: async () => {
      const res = await fetch("https://api.ipify.org/?format=json");
      const json = await res.json();

      return json;
    },
  });

  useEffect(() => {
    if (data?.ip) {
      localStorage.setItem("ip", data.ip);
    }
  }, [data]);

  return {
    data,
    isPending,
  };
}
