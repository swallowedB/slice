import { useAuthStore } from "@/store/useAuthStore";

let hydratePromise: Promise<void> | null = null;

export function useHydratedAuth() {
  const store = useAuthStore();

  if (typeof window === "undefined") {
    throw new Promise(() => {});
  }

  if (!store.hydrated) {
    if (!hydratePromise) {
      hydratePromise = new Promise<void>((resolve) => {
        const unsubscribe = useAuthStore.subscribe((state) => {
          if (state.hydrated) {
            unsubscribe();
            hydratePromise = null;
            resolve();
          }
        });
      });
    }
    throw hydratePromise;
  }

  return store;
}
