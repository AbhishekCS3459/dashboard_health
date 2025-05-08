import { DashboardShell } from "@/components/dashboard-shell"
import { BlueCardGenerator } from "@/components/blue-card-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blue Card Generator | Sci-I Clinic",
  description: "Generate and manage patient blue cards for tracking",
}

export default function BlueCardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blue Card Generator</h1>
          <p className="text-sm text-muted-foreground">
            Generate and manage blue cards for tracking patients through their hospital journey.
          </p>
        </div>
        <BlueCardGenerator />
      </div>
    </DashboardShell>
  )
}
