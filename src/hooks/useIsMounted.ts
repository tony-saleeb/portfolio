import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Hydration-safe "are we on the client yet" check without the
 * setState-in-effect-on-mount anti-pattern (calling setState synchronously
 * in an effect body just to force a re-render after mount).
 */
export function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
