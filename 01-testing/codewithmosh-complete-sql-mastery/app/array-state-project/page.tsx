"use client";

import { useState } from "react";

export default function ArrayStateProject() {
  const [array, setArray] = useState(["A", "B", "C"]);

  return (
    <div className="p-4">
      <div>{array.join(", ")}</div>
      <button
        onClick={() => setArray((prevVal) => prevVal.slice(1))}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Remove First Element
      </button>
    </div>
  );
}
