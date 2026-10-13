"use client";

import { useEffect, useState } from "react";

function format(timeZone: string, date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function useLocalTime(timeZone: string): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(format(timeZone, new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return time;
}
