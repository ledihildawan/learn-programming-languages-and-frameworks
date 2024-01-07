import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

const timeFmt = new Intl.RelativeTimeFormat("en-US");

export default function Countdown(props: { target: string }) {
  const now = useSignal(new Date())
  const target = new Date(props.target);

  useEffect(() => {
    const timer = setInterval(() => {
      if (now.value > target) {
        clearInterval(timer);
      }

      now.value = new Date();
    })

    return () => clearInterval(timer);
  }, [props.target])

  const secondLeft = Math.floor(target.getTime() - now.value.getTime() / 1000);

  if (secondLeft < 0) {
    return <span>🎉</span>;
  }

  return <span>{timeFmt.format(secondLeft, "seconds")}</span>
}