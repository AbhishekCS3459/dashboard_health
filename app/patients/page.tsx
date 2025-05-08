import { DashboardShell } from "@/components/dashboard-shell"
import { PatientsList } from "@/components/patients-list"

export default function PatientsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Patient Records</h1>
          <p className="text-sm text-muted-foreground">View and manage all patient records.</p>
        </div>
        <PatientsList />
      </div>
    </DashboardShell>
  )
}
