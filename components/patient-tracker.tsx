"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PatientJourneyTracker } from "@/components/patient-journey-tracker"
import { toast } from "@/components/ui/use-toast"
import { Search, RefreshCw, Clock, AlertCircle, Bell, MessageSquare, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  contactNumber: string
  department: string
  doctor: string
  currentStep: number
  waitTime: string
  status: "waiting" | "in-progress" | "completed" | "delayed"
  lastUpdated: string
}

export function PatientTracker() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])

  // Simulate loading patients data
  useEffect(() => {
    const timer = setTimeout(() => {
      setPatients([
        {
          id: "SCI-23051",
          name: "Arun Patel",
          age: 45,
          gender: "Male",
          contactNumber: "+91 98765 43210",
          department: "Retina",
          doctor: "Dr. Mehta",
          currentStep: 2,
          waitTime: "15 min",
          status: "waiting",
          lastUpdated: "10:30 AM",
        },
        {
          id: "SCI-23052",
          name: "Priya Sharma",
          age: 32,
          gender: "Female",
          contactNumber: "+91 98765 43211",
          department: "Cornea",
          doctor: "Dr. Gupta",
          currentStep: 3,
          waitTime: "25 min",
          status: "in-progress",
          lastUpdated: "10:15 AM",
        },
        {
          id: "SCI-23053",
          name: "Vikram Singh",
          age: 58,
          gender: "Male",
          contactNumber: "+91 98765 43212",
          department: "Glaucoma",
          doctor: "Dr. Shah",
          currentStep: 1,
          waitTime: "5 min",
          status: "waiting",
          lastUpdated: "10:45 AM",
        },
        {
          id: "SCI-23054",
          name: "Neha Desai",
          age: 27,
          gender: "Female",
          contactNumber: "+91 98765 43213",
          department: "Pediatric",
          doctor: "Dr. Patel",
          currentStep: 4,
          waitTime: "40 min",
          status: "delayed",
          lastUpdated: "9:30 AM",
        },
        {
          id: "SCI-23055",
          name: "Rajesh Kumar",
          age: 62,
          gender: "Male",
          contactNumber: "+91 98765 43214",
          department: "Retina",
          doctor: "Dr. Mehta",
          currentStep: 6,
          waitTime: "0 min",
          status: "completed",
          lastUpdated: "11:00 AM",
        },
      ])
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setIsLoading(true)

    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      setIsLoading(false)
      toast({
        title: "Data Refreshed",
        description: "Patient tracking data has been updated.",
      })
    }, 1000)
  }

  const handleUpdateStatus = (patientId: string, newStep: number) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              currentStep: newStep,
              lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: newStep === 6 ? "completed" : patient.status,
            }
          : patient,
      ),
    )

    if (selectedPatient?.id === patientId) {
      setSelectedPatient((prev) =>
        prev
          ? {
              ...prev,
              currentStep: newStep,
              lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: newStep === 6 ? "completed" : prev.status,
            }
          : null,
      )
    }

    toast({
      title: "Patient Status Updated",
      description: `Patient has been moved to step ${newStep}.`,
    })
  }

  const handleSendNotification = (patientId: string) => {
    toast({
      title: "Notification Sent",
      description: "The patient has been notified via WhatsApp.",
    })
  }

  const filteredPatients = patients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((patient) => (statusFilter === "all" ? true : patient.status === statusFilter))
    .filter((patient) =>
      departmentFilter === "all" ? true : patient.department.toLowerCase() === departmentFilter.toLowerCase(),
    )

  const steps = [
    { id: 1, name: "Registration", completed: true },
    { id: 2, name: "Billing", completed: false },
    { id: 3, name: "Optometry", completed: false },
    { id: 4, name: "Doctor", completed: false },
    { id: 5, name: "Pharmacy", completed: false },
    { id: 6, name: "Optical", completed: false },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "waiting":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-900 animate-pulse">
            Waiting
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100 dark:bg-cyan-900 dark:text-cyan-100 dark:hover:bg-cyan-900">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900">
            Completed
          </Badge>
        )
      case "delayed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900">
            Delayed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8 h-9 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="h-9 w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="retina">Retina</SelectItem>
              <SelectItem value="cornea">Cornea</SelectItem>
              <SelectItem value="glaucoma">Glaucoma</SelectItem>
              <SelectItem value="pediatric">Pediatric</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1 w-full sm:w-auto ml-auto"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Patients</CardTitle>
              <CardDescription>Patients currently in the hospital</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {isLoading ? (
                  // Skeleton loading state
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 border-b last:border-0">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-6 w-16" />
                      </div>
                    ))
                ) : filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className={cn(
                        "flex items-start gap-3 p-4 border-b last:border-0 cursor-pointer transition-colors",
                        selectedPatient?.id === patient.id ? "bg-primary/5 dark:bg-primary/10" : "hover:bg-muted/50",
                      )}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={patient.name} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {patient.id} • {patient.age}/{patient.gender.charAt(0)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(patient.status)}
                          <div className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {patient.waitTime}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-right text-muted-foreground">
                        <div>Step {patient.currentStep}/6</div>
                        <div className="mt-1">{patient.lastUpdated}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center p-4">
                    <Search className="h-8 w-8 text-muted-foreground/50 mb-2" />
                    <h3 className="text-lg font-medium">No patients found</h3>
                    <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedPatient ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedPatient.name}</CardTitle>
                    <CardDescription>
                      {selectedPatient.id} • {selectedPatient.department} • {selectedPatient.doctor}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">{getStatusBadge(selectedPatient.status)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="journey">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="journey">Journey Tracker</TabsTrigger>
                    <TabsTrigger value="details">Patient Details</TabsTrigger>
                    <TabsTrigger value="actions">Quick Actions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="journey" className="mt-4 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Current Progress</h3>
                      <PatientJourneyTracker
                        steps={steps.map((step, index) => ({
                          ...step,
                          completed: index + 1 < selectedPatient.currentStep,
                        }))}
                        currentStep={selectedPatient.currentStep}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Update Status</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {steps.map((step) => (
                          <Button
                            key={step.id}
                            variant={selectedPatient.currentStep === step.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleUpdateStatus(selectedPatient.id, step.id)}
                            disabled={step.id < selectedPatient.currentStep}
                          >
                            {step.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">Wait Time Information</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Patient has been waiting for {selectedPatient.waitTime} in the current stage.
                            {selectedPatient.status === "delayed" && (
                              <span className="text-red-500 ml-1">This exceeds the expected wait time.</span>
                            )}
                          </p>
                          <div className="mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1"
                              onClick={() => handleSendNotification(selectedPatient.id)}
                            >
                              <Bell className="h-3.5 w-3.5" />
                              <span>Send Wait Time Update</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Personal Information</h3>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Name:</div>
                            <div className="text-sm">{selectedPatient.name}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Age/Gender:</div>
                            <div className="text-sm">
                              {selectedPatient.age}/{selectedPatient.gender}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Contact:</div>
                            <div className="text-sm">{selectedPatient.contactNumber}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Patient ID:</div>
                            <div className="text-sm">{selectedPatient.id}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Appointment Information</h3>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Department:</div>
                            <div className="text-sm">{selectedPatient.department}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Doctor:</div>
                            <div className="text-sm">{selectedPatient.doctor}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Current Stage:</div>
                            <div className="text-sm">{steps[selectedPatient.currentStep - 1]?.name}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-sm font-medium text-muted-foreground">Last Updated:</div>
                            <div className="text-sm">{selectedPatient.lastUpdated}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="actions" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="border-dashed">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Communication</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button className="w-full justify-start gap-2" variant="outline" size="sm">
                            <Bell className="h-4 w-4" />
                            Send Status Update
                          </Button>
                          <Button className="w-full justify-start gap-2" variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                            Send WhatsApp Message
                          </Button>
                          <Button className="w-full justify-start gap-2" variant="outline" size="sm">
                            <AlertCircle className="h-4 w-4" />
                            Mark as Delayed
                          </Button>
                        </CardContent>
                      </Card>
                      <Card className="border-dashed">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Patient Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button className="w-full justify-start gap-2" variant="outline" size="sm">
                            <ArrowRight className="h-4 w-4" />
                            Move to Next Department
                          </Button>
                          <Button className="w-full justify-start gap-2" variant="outline" size="sm">
                            <Clock className="h-4 w-4" />
                            Update Wait Time
                          </Button>
                          <Button className="w-full justify-start gap-2 text-destructive" variant="outline" size="sm">
                            <AlertCircle className="h-4 w-4" />
                            Mark as Completed
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center justify-between w-full">
                  <Button variant="outline" size="sm" onClick={() => setSelectedPatient(null)}>
                    Back to List
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleSendNotification(selectedPatient.id)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Notify Patient
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        handleUpdateStatus(selectedPatient.id, Math.min(selectedPatient.currentStep + 1, steps.length))
                      }
                      disabled={selectedPatient.currentStep === steps.length}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Next Stage
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-full flex flex-col justify-center items-center p-8">
              <div className="text-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium">No Patient Selected</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Select a patient from the list to view their details and manage their journey through the hospital.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
