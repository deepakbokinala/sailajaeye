"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import type { OutstaticData } from "outstatic";

const OstClient = dynamic(
  () => import("outstatic/client").then((m) => m.OstClient),
  { ssr: false }
);

export function OstClientWrapper({
  ostData,
  ost,
}: {
  ostData: OutstaticData;
  ost: string[];
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const msg = typeof args[0] === "string" ? args[0] : "";
      if (
        msg.includes("Encountered a script tag while rendering React component") ||
        msg.includes("A tree hydrated but some attributes")
      ) {
        return;
      }
      originalError.apply(console, args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return <OstClient ostData={ostData} params={{ ost }} />;
}
