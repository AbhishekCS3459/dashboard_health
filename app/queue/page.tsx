import { DashboardShell } from "@/components/dashboard-shell"
import { LiveQueueTable } from "@/components/live-queue-table"

export default function QueuePage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Live Queue</h1>
          <p className="text-sm text-muted-foreground">Real-time view of all patients in the queue.</p>
        </div>
        <LiveQueueTable />
      </div>
    </DashboardShell>
  )
}
