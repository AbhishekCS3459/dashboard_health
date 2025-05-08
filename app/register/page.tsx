import { DashboardShell } from "@/components/dashboard-shell"
import { RegisterPatientForm } from "@/components/register-patient-form"

export default function RegisterPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Register New Patient</h1>
          <p className="text-sm text-muted-foreground">Enter patient details to register them in the system.</p>
        </div>
        <RegisterPatientForm />
      </div>
    </DashboardShell>
  )
}
