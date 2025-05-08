"use client"

import { useState } from "react"
import { Clock, Eye, Filter, MoreHorizontal, RefreshCw, Search, ArrowUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  waitTime: string
  status: "Paid" | "Waiting" | "In Consultation" | "Complete" | "Delayed"
  doctor: string
  department: string
}

const patients: Patient[] = [
  {
    id: "SCI-23051",
    name: "Arun Patel",
    age: 45,
    gender: "Male",
    waitTime: "15 min",
    status: "Waiting",
    doctor: "Dr. Mehta",
    department: "Retina",
  },
  {
    id: "SCI-23052",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    waitTime: "25 min",
    status: "In Consultation",
    doctor: "Dr. Gupta",
    department: "Cornea",
  },
  {
    id: "SCI-23053",
    name: "Vikram Singh",
    age: 58,
    gender: "Male",
    waitTime: "5 min",
    status: "Paid",
    doctor: "Dr. Shah",
    department: "Glaucoma",
  },
  {
    id: "SCI-23054",
    name: "Neha Desai",
    age: 27,
    gender: "Female",
    waitTime: "40 min",
    status: "Delayed",
    doctor: "Dr. Patel",
    department: "Pediatric",
  },
  {
    id: "SCI-23055",
    name: "Rajesh Kumar",
    age: 62,
    gender: "Male",
    waitTime: "0 min",
    status: "Complete",
    doctor: "Dr. Mehta",
    department: "Retina",
  },
  {
    id: "SCI-23056",
    name: "Ananya Reddy",
    age: 35,
    gender: "Female",
    waitTime: "10 min",
    status: "Waiting",
    doctor: "Dr. Gupta",
    department: "Cornea",
  },
  {
    id: "SCI-23057",
    name: "Sanjay Verma",
    age: 50,
    gender: "Male",
    waitTime: "20 min",
    status: "Waiting",
    doctor: "Dr. Shah",
    department: "Glaucoma",
  },
  {
    id: "SCI-23058",
    name: "Meera Joshi",
    age: 42,
    gender: "Female",
    waitTime: "30 min",
    status: "In Consultation",
    doctor: "Dr. Patel",
    department: "Retina",
  },
]

interface LiveQueueTableProps {
  limit?: number
}

export function LiveQueueTable({ limit }: LiveQueueTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedPatients = [...patients].sort((a, b) => {
    if (!sortColumn) return 0

    let valueA, valueB

    if (sortColumn === "waitTime") {
      valueA = Number.parseInt(a.waitTime.split(" ")[0])
      valueB = Number.parseInt(b.waitTime.split(" ")[0])
    } else if (sortColumn === "name") {
      valueA = a.name
      valueB = b.name
    } else if (sortColumn === "status") {
      valueA = a.status
      valueB = b.status
    } else if (sortColumn === "doctor") {
      valueA = a.doctor
      valueB = b.doctor
    } else if (sortColumn === "department") {
      valueA = a.department
      valueB = b.department
    } else {
      return 0
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredPatients = sortedPatients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((patient) => (statusFilter === "all" ? true : patient.status === statusFilter))
    .slice(0, limit || patients.length)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setIsLoading(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
      setIsLoading(false)
    }, 1000)
  }

  const getStatusBadge = (status: Patient["status"]) => {
    switch (status) {
      case "Paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900">
            {status}
          </Badge>
        )
      case "Waiting":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-900 animate-pulse">
            {status}
          </Badge>
        )
      case "In Consultation":
        return (
          <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100 dark:bg-cyan-900 dark:text-cyan-100 dark:hover:bg-cyan-900">
            {status}
          </Badge>
        )
      case "Complete":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-800">
            {status}
          </Badge>
        )
      case "Delayed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
    }

    return sortDirection === "asc" ? (
      <ArrowUpDown className="ml-1 h-3 w-3 rotate-0" />
    ) : (
      <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" />
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Live Patient Queue</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search patients..."
                className="pl-8 h-9 w-full sm:w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-full sm:w-[150px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Waiting">Waiting</SelectItem>
                <SelectItem value="In Consultation">In Consultation</SelectItem>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-medium"
                      onClick={() => handleSort("name")}
                    >
                      Patient
                      {renderSortIcon("name")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-medium"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      {renderSortIcon("status")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-medium"
                      onClick={() => handleSort("waitTime")}
                    >
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Wait Time</span>
                        {renderSortIcon("waitTime")}
                      </div>
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-medium"
                      onClick={() => handleSort("doctor")}
                    >
                      Doctor
                      {renderSortIcon("doctor")}
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-medium"
                      onClick={() => handleSort("department")}
                    >
                      Department
                      {renderSortIcon("department")}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Skeleton loading state for table rows
                  Array(limit || 5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i} className="group">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <div>
                              <Skeleton className="h-4 w-32 mb-1" />
                              <Skeleton className="h-3 w-24" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-12" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-5 w-24" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md ml-1" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="group animate-in fade-in-50 duration-300">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={patient.name} />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {patient.id} • {patient.age}/{patient.gender.charAt(0)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(patient.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{patient.waitTime}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{patient.doctor}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.department}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View patient</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View patient details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View profile</DropdownMenuItem>
                              <DropdownMenuItem>Update status</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Send message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="h-8 w-8 text-muted-foreground/50" />
                        <div className="text-lg font-medium">No patients found</div>
                        <p className="text-sm text-muted-foreground">
                          Try a different search term or clear the filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
