import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardOverview } from "@/components/dashboard-overview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Sci-I Clinic",
  description: "Receptionist Dashboard for Sci-I Clinic",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardOverview />
    </DashboardShell>
  )
}
