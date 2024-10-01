import { useCallback, useEffect, useState } from "react";

interface UseCoolDownResult {
  coolDown: number;
  startCoolDown: (duration: number) => void;
}

export function useCoolDown(initialCoolDown: number = 0): UseCoolDownResult {
  const [coolDown, setCoolDown] = useState<number>(initialCoolDown);

  const startCoolDown = useCallback((duration: number): void => {
    setCoolDown(Math.max(0, duration));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (coolDown > 0) {
      interval = setInterval(() => {
        setCoolDown((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [coolDown]);

  return { coolDown, startCoolDown };
}
