"use client"

import type React from "react"

import { AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import {
  Activity,
  Calendar,
  Clock,
  Eye,
  RefreshCw,
  Users,
  AlertCircle,
  Check,
  History,
  Ban,
  Bell,
  Map,
  MessageSquare,
  FileText,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientJourneyTracker } from "@/components/patient-journey-tracker"
import { LiveQueueTable } from "@/components/live-queue-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface QueueStat {
  department: string
  count: number
  icon: React.ElementType
  color: string
  darkColor: string
}

export function DashboardOverview() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPatients: 0,
    waitingPatients: 0,
    consultationPatients: 0,
    completedPatients: 0,
  })

  const queueStats: QueueStat[] = [
    {
      department: "Optometry",
      count: 5,
      icon: Eye,
      color: "bg-blue-100 text-blue-700",
      darkColor: "dark:bg-blue-900 dark:text-blue-300",
    },
    {
      department: "Dilation",
      count: 3,
      icon: Clock,
      color: "bg-purple-100 text-purple-700",
      darkColor: "dark:bg-purple-900 dark:text-purple-300",
    },
    {
      department: "Doctor",
      count: 8,
      icon: Activity,
      color: "bg-emerald-100 text-emerald-700",
      darkColor: "dark:bg-emerald-900 dark:text-emerald-300",
    },
    {
      department: "Billing",
      count: 2,
      icon: Calendar,
      color: "bg-amber-100 text-amber-700",
      darkColor: "dark:bg-amber-900 dark:text-amber-300",
    },
  ]

  // Simulate loading stats
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalPatients: 147,
        waitingPatients: 32,
        consultationPatients: 18,
        completedPatients: 97,
      })
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setIsLoading(true)

    // Simulate refresh
    setTimeout(() => {
      setStats({
        totalPatients: 149,
        waitingPatients: 34,
        consultationPatients: 20,
        completedPatients: 95,
      })
      setIsRefreshing(false)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Dr. Riya. Here's what's happening today.</p>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
          <Link href="/register" className="block p-4">
            <div className="flex flex-col items-center text-center gap-2">
              <Plus className="h-6 w-6" />
              <div className="font-medium">New Patient</div>
            </div>
          </Link>
        </Card>
        <Card className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors cursor-pointer">
          <Link href="/blue-card" className="block p-4">
            <div className="flex flex-col items-center text-center gap-2">
              <FileText className="h-6 w-6" />
              <div className="font-medium">Blue Card</div>
            </div>
          </Link>
        </Card>
        <Card className="bg-accent text-accent-foreground hover:bg-accent/90 transition-colors cursor-pointer">
          <Link href="/tracker" className="block p-4">
            <div className="flex flex-col items-center text-center gap-2">
              <Map className="h-6 w-6" />
              <div className="font-medium">Track Patient</div>
            </div>
          </Link>
        </Card>
        <Card className="bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
          <Link href="/notifications" className="block p-4">
            <div className="flex flex-col items-center text-center gap-2">
              <MessageSquare className="h-6 w-6" />
              <div className="font-medium">Send Message</div>
            </div>
          </Link>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          // Skeleton loading states
          Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-24" />
                  </CardTitle>
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-16 mb-1" />
                  <Skeleton className="h-3 w-28" />
                </CardContent>
              </Card>
            ))
        ) : (
          <>
            <Card className="overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/0 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPatients}</div>
                <p className="text-xs text-muted-foreground">Today's patient count</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-warning/5 to-warning/0 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waiting</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.waitingPatients}</div>
                <p className="text-xs text-muted-foreground">Patients in waiting area</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent/0 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Consultation</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.consultationPatients}</div>
                <p className="text-xs text-muted-foreground">Currently with doctors</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-success/0 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedPatients}</div>
                <p className="text-xs text-muted-foreground">Consultations completed</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Department Queue Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Department Queue</CardTitle>
          <CardDescription>Current number of patients in each department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {queueStats.map((stat, index) => (
              <div
                key={index}
                className={cn("flex items-center gap-3 p-3 rounded-lg border", stat.color, stat.darkColor)}
              >
                <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-bold">{stat.count}</div>
                  <div className="text-xs">{stat.department}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Current Patient</CardTitle>
            <CardDescription>Track the current patient's journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Patient" />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Arun Patel</div>
                <div className="text-sm text-muted-foreground">ID: SCI-23051</div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                  >
                    <Calendar className="mr-1 h-3 w-3" />
                    First Visit
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950 animate-pulse"
                  >
                    <Clock className="mr-1 h-3 w-3" />
                    Waiting
                  </Badge>
                </div>
              </div>

              <div className="hidden sm:flex sm:flex-col sm:items-end sm:gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <div className="text-xs text-muted-foreground">15 min</div>
              </div>
            </div>
            <PatientJourneyTracker
              currentStep={2}
              steps={[
                { id: 1, name: "Registration", completed: true },
                { id: 2, name: "Billing", completed: true },
                { id: 3, name: "Optometry", completed: false },
                { id: 4, name: "Doctor", completed: false },
                { id: 5, name: "Pharmacy", completed: false },
                { id: 6, name: "Optical", completed: false },
              ]}
            />
            <div className="mt-4 flex justify-end">
              <Button size="sm" asChild>
                <Link href="/tracker">View All Patients</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Upcoming appointments for today</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                  {new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "10:30 AM",
                  name: "Vikram Singh",
                  doctor: "Dr. Mehta",
                  department: "Retina",
                  status: "delayed",
                },
                { time: "11:15 AM", name: "Priya Sharma", doctor: "Dr. Gupta", department: "Cornea", status: "ontime" },
                {
                  time: "12:00 PM",
                  name: "Rahul Kumar",
                  doctor: "Dr. Patel",
                  department: "Glaucoma",
                  status: "ontime",
                },
                {
                  time: "2:30 PM",
                  name: "Ananya Desai",
                  doctor: "Dr. Shah",
                  department: "Pediatric",
                  status: "ontime",
                },
              ].map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-primary",
                        appointment.status === "delayed" ? "bg-warning/20" : "bg-primary/10",
                      )}
                    >
                      {appointment.status === "delayed" ? (
                        <AlertCircle className="h-4 w-4 text-warning" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{appointment.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.doctor} • {appointment.department}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={cn("text-sm font-medium", appointment.status === "delayed" ? "text-warning" : "")}>
                      {appointment.time}
                    </div>
                    {appointment.status === "delayed" && <div className="text-xs text-warning">Delayed</div>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full">
              View Full Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="queue">Live Queue</TabsTrigger>
          <TabsTrigger value="recent">Recent Patients</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="queue" className="mt-4">
          <LiveQueueTable limit={5} />
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Completed</CardTitle>
              <CardDescription>Patients who have completed their consultation today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "09:45 AM", name: "Meera Joshi", id: "SCI-23042", doctor: "Dr. Gupta", status: "Completed" },
                  { time: "10:15 AM", name: "Rajesh Kumar", id: "SCI-23043", doctor: "Dr. Mehta", status: "Completed" },
                  { time: "10:30 AM", name: "Sanjay Patel", id: "SCI-23044", doctor: "Dr. Shah", status: "Completed" },
                  { time: "11:00 AM", name: "Neha Singh", id: "SCI-23045", doctor: "Dr. Patel", status: "Completed" },
                  { time: "11:30 AM", name: "Amit Verma", id: "SCI-23046", doctor: "Dr. Gupta", status: "Completed" },
                ].map((patient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={patient.name} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {patient.id} • {patient.doctor}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {patient.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{patient.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Activity</CardTitle>
              <CardDescription>System activities and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: "12:15 PM",
                    action: "Patient status updated",
                    target: "Arun Patel",
                    details: "Moving to Dilation",
                    icon: History,
                    status: "info",
                  },
                  {
                    time: "11:45 AM",
                    action: "New registration",
                    target: "Sana Khan",
                    details: "Registered with Dr. Gupta",
                    icon: Check,
                    status: "success",
                  },
                  {
                    time: "11:30 AM",
                    action: "System notification",
                    target: "Appointment alerts",
                    details: "SMS notifications sent",
                    icon: Bell,
                    status: "info",
                  },
                  {
                    time: "10:45 AM",
                    action: "Patient delay",
                    target: "Vikram Singh",
                    details: "Appointment delayed by 30min",
                    icon: AlertCircle,
                    status: "warning",
                  },
                  {
                    time: "10:15 AM",
                    action: "Appointment cancelled",
                    target: "Reena Kapoor",
                    details: "Cancelled afternoon slot",
                    icon: Ban,
                    status: "error",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                        activity.status === "info" && "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
                        activity.status === "success" &&
                          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                        activity.status === "warning" &&
                          "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
                        activity.status === "error" && "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
                      )}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">{activity.action}</div>
                        <div className="text-xs text-muted-foreground ml-2 shrink-0">{activity.time}</div>
                      </div>
                      <div className="text-sm">{activity.target}</div>
                      <div className="text-xs text-muted-foreground">{activity.details}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
