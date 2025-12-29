"use client";

import { Suspense, ComponentProps } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Button from "@/components/common/button/Button";

interface AsyncBoundaryProps {
  children: React.ReactNode;
  errorFallback?: (props: FallbackProps) => React.ReactNode;
  loadingFallback?: React.ReactNode;
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center py-26 lg:py-31.75">
      <img
        src="/icons/icon-empty.svg"
        alt="error"
        className="mb-6 w-20 sm:w-32.5"
      />
      <p className="mb-8 text-sm font-medium text-gray-600 sm:text-base">
        {error.message}
      </p>
      <Button
        size="compact"
        onClick={resetErrorBoundary}>
        다시 시도
      </Button>
    </div>
  );
}

export function AsyncBoundary({
  children,
  errorFallback = DefaultErrorFallback,
  loadingFallback,
}: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={errorFallback}>
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
