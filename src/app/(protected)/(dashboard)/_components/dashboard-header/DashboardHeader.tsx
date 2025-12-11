"use client";
import PageHeader from "@/app/(protected)/_components/layout/PageHeader";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardHeader() {
  const nickname = useAuthStore((state) => state.user?.name ?? "");
  return (
    <PageHeader
      title={`${nickname}님의 대시보드`}
      desktopClassName="sm:mb-8.5"
    />
  );
}
