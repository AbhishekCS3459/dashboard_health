"use client"

import { useState } from "react"
import { Bell, Calendar, Check, Clock, Eye, Filter, MoreHorizontal, RefreshCw, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "appointment" | "patient" | "system" | "alert"
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "n1",
    title: "New Appointment",
    description: "Vikram Singh scheduled for 10:30 AM with Dr. Mehta",
    time: "10 minutes ago",
    type: "appointment",
    read: false,
  },
  {
    id: "n2",
    title: "Patient Arrived",
    description: "Priya Sharma has arrived for her appointment",
    time: "25 minutes ago",
    type: "patient",
    read: false,
  },
  {
    id: "n3",
    title: "System Update",
    description: "The system will undergo maintenance tonight at 11 PM",
    time: "1 hour ago",
    type: "system",
    read: true,
  },
  {
    id: "n4",
    title: "Delayed Appointment",
    description: "Dr. Gupta's appointments are delayed by 30 minutes",
    time: "2 hours ago",
    type: "alert",
    read: true,
  },
  {
    id: "n5",
    title: "New Patient Registered",
    description: "Rajesh Kumar has been registered in the system",
    time: "3 hours ago",
    type: "patient",
    read: true,
  },
  {
    id: "n6",
    title: "Appointment Cancelled",
    description: "Neha Desai cancelled her appointment for today",
    time: "4 hours ago",
    type: "appointment",
    read: true,
  },
  {
    id: "n7",
    title: "System Alert",
    description: "Low stock alert for eye drops in pharmacy",
    time: "5 hours ago",
    type: "alert",
    read: true,
  },
  {
    id: "n8",
    title: "Doctor Available",
    description: "Dr. Shah is now available for consultations",
    time: "6 hours ago",
    type: "system",
    read: true,
  },
]

export function NotificationCenter() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleMarkAllAsRead = () => {
    setNotificationsList((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const handleMarkAsRead = (id: string) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleDeleteNotification = (id: string) => {
    setNotificationsList((prev) => prev.filter((notification) => notification.id !== id))
  }

  const filteredNotifications = notificationsList
    .filter((notification) => {
      if (activeTab === "all") return true
      if (activeTab === "unread") return !notification.read
      return true
    })
    .filter((notification) => {
      if (typeFilter === "all") return true
      return notification.type === typeFilter
    })

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "patient":
        return <User className="h-4 w-4" />
      case "system":
        return <Bell className="h-4 w-4" />
      case "alert":
        return <Eye className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      case "patient":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "system":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
      case "alert":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Notification Center</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9 w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="appointment">Appointments</SelectItem>
                <SelectItem value="patient">Patients</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="alert">Alerts</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 w-full sm:w-auto"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1 w-full sm:w-auto" onClick={handleMarkAllAsRead}>
              <Check className="h-3.5 w-3.5" />
              <span>Mark All Read</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2 bg-card">
                {notificationsList.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="outline" className="ml-2 bg-card">
                {notificationsList.filter((n) => !n.read).length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          <div className="mt-4 space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    flex items-start gap-4 p-4 rounded-lg border
                    ${!notification.read ? "bg-muted/50" : ""}
                  `}
                >
                  <div
                    className={`
                    flex h-10 w-10 items-center justify-center rounded-full
                    ${getNotificationColor(notification.type)}
                  `}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <div className="flex items-center gap-1">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {!notification.read && (
                              <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                <span>Mark as read</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDeleteNotification(notification.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "unread"
                    ? "You've read all your notifications"
                    : "You don't have any notifications yet"}
                </p>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
