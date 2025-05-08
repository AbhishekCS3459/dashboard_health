import { DashboardShell } from "@/components/dashboard-shell"
import { PatientTracker } from "@/components/patient-tracker"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patient Tracker | Sci-I Clinic",
  description: "Track patients through their hospital journey",
}

export default function TrackerPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Patient Tracker</h1>
          <p className="text-sm text-muted-foreground">
            Track patients through their journey in the hospital and manage their progress.
          </p>
        </div>
        <PatientTracker />
      </div>
    </DashboardShell>
  )
}
