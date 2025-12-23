"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProtalProps {
  children: ReactNode;
}

export default function Portal({ children }: ProtalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
