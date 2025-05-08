"use client"

import { useState } from "react"
import { Calendar, Download, Eye, Filter, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react"
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  lastVisit: string
  doctor: string
  department: string
  phone: string
  email: string
}

const patients: Patient[] = [
  {
    id: "SCI-23001",
    name: "Arun Patel",
    age: 45,
    gender: "Male",
    lastVisit: "2023-05-15",
    doctor: "Dr. Mehta",
    department: "Retina",
    phone: "+91 98765 43210",
    email: "arun.patel@example.com",
  },
  {
    id: "SCI-23002",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    lastVisit: "2023-05-18",
    doctor: "Dr. Gupta",
    department: "Cornea",
    phone: "+91 98765 43211",
    email: "priya.sharma@example.com",
  },
  {
    id: "SCI-23003",
    name: "Vikram Singh",
    age: 58,
    gender: "Male",
    lastVisit: "2023-05-20",
    doctor: "Dr. Shah",
    department: "Glaucoma",
    phone: "+91 98765 43212",
    email: "vikram.singh@example.com",
  },
  {
    id: "SCI-23004",
    name: "Neha Desai",
    age: 27,
    gender: "Female",
    lastVisit: "2023-05-22",
    doctor: "Dr. Patel",
    department: "Pediatric",
    phone: "+91 98765 43213",
    email: "neha.desai@example.com",
  },
  {
    id: "SCI-23005",
    name: "Rajesh Kumar",
    age: 62,
    gender: "Male",
    lastVisit: "2023-05-25",
    doctor: "Dr. Mehta",
    department: "Retina",
    phone: "+91 98765 43214",
    email: "rajesh.kumar@example.com",
  },
  {
    id: "SCI-23006",
    name: "Ananya Reddy",
    age: 35,
    gender: "Female",
    lastVisit: "2023-05-27",
    doctor: "Dr. Gupta",
    department: "Cornea",
    phone: "+91 98765 43215",
    email: "ananya.reddy@example.com",
  },
  {
    id: "SCI-23007",
    name: "Sanjay Verma",
    age: 50,
    gender: "Male",
    lastVisit: "2023-05-29",
    doctor: "Dr. Shah",
    department: "Glaucoma",
    phone: "+91 98765 43216",
    email: "sanjay.verma@example.com",
  },
  {
    id: "SCI-23008",
    name: "Meera Joshi",
    age: 42,
    gender: "Female",
    lastVisit: "2023-05-30",
    doctor: "Dr. Patel",
    department: "Retina",
    phone: "+91 98765 43217",
    email: "meera.joshi@example.com",
  },
]

export function PatientsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")

  const filteredPatients = patients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((patient) =>
      departmentFilter === "all" ? true : patient.department.toLowerCase() === departmentFilter.toLowerCase(),
    )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Patient Records</CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
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
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="h-9 w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by department" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Retina">Retina</SelectItem>
                <SelectItem value="Cornea">Cornea</SelectItem>
                <SelectItem value="Glaucoma">Glaucoma</SelectItem>
                <SelectItem value="Pediatric">Pediatric</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9 gap-1 w-full sm:w-auto">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Advanced Filters</span>
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1 w-full sm:w-auto">
              <Download className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Last Visit</span>
                  </div>
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="group">
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
                    <TableCell>
                      <Badge variant="outline" className="bg-card">
                        {patient.department}
                      </Badge>
                    </TableCell>
                    <TableCell>{patient.doctor}</TableCell>
                    <TableCell>{formatDate(patient.lastVisit)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{patient.phone}</div>
                        <div className="text-xs text-muted-foreground">{patient.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View patient</span>
                        </Button>
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
                            <DropdownMenuItem>Edit patient</DropdownMenuItem>
                            <DropdownMenuItem>Schedule appointment</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Medical history</DropdownMenuItem>
                            <DropdownMenuItem>Print records</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}
