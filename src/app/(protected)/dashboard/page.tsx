"use client";

import { Suspense } from "react";
import DashboardClient from "./_components/DashboardClient";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardClient />
    </Suspense>
  );
}
