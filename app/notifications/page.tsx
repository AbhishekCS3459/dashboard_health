import { DashboardShell } from "@/components/dashboard-shell"
import { NotificationCenter } from "@/components/notification-center"

export default function NotificationsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notification Center</h1>
          <p className="text-sm text-muted-foreground">View all system notifications and activity logs.</p>
        </div>
        <NotificationCenter />
      </div>
    </DashboardShell>
  )
}
