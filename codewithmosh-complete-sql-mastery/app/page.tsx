"use client";

import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0);

  const { readyState } = useWebSocket("ws://localhost:3001/visitor", {
    onMessage: (message) => {
      const data = JSON.parse(message.data);

      setVisitorCount(data.visitorCount);
    },
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  });

  return (
    <div>
      <h1>Live Visitor Count</h1>
      <p>Current Visitors: {visitorCount}</p>
      <p>Status: {readyState === 1 ? "Connected" : "Disconnected"}</p>
    </div>
  );
}
