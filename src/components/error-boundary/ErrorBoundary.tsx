"use client";
import { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <img
            src="/icons/icon-empty.svg"
            alt="empty 아이콘"
            className="mb-4.5 w-20 sm:w-32.5"
          />
          <p className="text-ml">문제가 발생했어요. 새로고침 해주세요.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
