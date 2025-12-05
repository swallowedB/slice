import { useEffect, useLayoutEffect, useState } from "react";

interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

const IS_SERVER = typeof window === "undefined";
const useIsomorphicLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {},
): boolean {

  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(() => {
    if (!initializeWithValue) {
      return defaultValue;
    }
    return getMatches(query);
  });

  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQueryList.matches);
    };

    handleChange();

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);
  
  return matches;
}
