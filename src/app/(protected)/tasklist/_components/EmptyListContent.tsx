"use client";

import EmptyState from "@/components/common/empty-state/EmptyState";
import { EMPTY_MESSAGES } from "@/constants/messages";

export default function EmptyListContent({
  tab,
}: {
  tab: "ALL" | "TODO" | "DONE";
}) {
  const isTodo = tab === "TODO";
  const isDone = tab === "DONE";

  const emptyMessage = isTodo
    ? EMPTY_MESSAGES.TODO.TODO
    : isDone
      ? EMPTY_MESSAGES.TODO.DONE
      : EMPTY_MESSAGES.TODO.ALL;

  return <EmptyState>{emptyMessage}</EmptyState>;
}
