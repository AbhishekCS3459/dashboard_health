"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import {
  Bell,
  Clock,
  Eye,
  Home,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  Users,
  FileText,
  Map,
  Headphones,
  VolumeX,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { toast } from "@/components/ui/use-toast"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchOpen, setSearchOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Use a ref to track if we've shown the alert
  const alertShownRef = useRef(false)

  // Broadcast alerts data - defined outside the render cycle
  const broadcastAlerts = [{ message: "Dr. Mehta delayed by 30 mins", type: "warning" }]

  // Show alert notification only once on initial render
  useEffect(() => {
    if (broadcastAlerts.length > 0 && !alertShownRef.current) {
      alertShownRef.current = true

      // Use the toast function with variant parameter
      toast({
        title: "Alert",
        description: broadcastAlerts[0].message,
        variant: "warning",
      })
    }
  }, []) // Empty dependency array - only run once on mount

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Add keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setSearchOpen(true)
      }

      if (e.key === "Escape") {
        setSearchOpen(false)
      }

      // Add 'N' shortcut for new patient
      if (e.key === "n" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        window.location.href = "/register"
      }

      // Add 'B' shortcut for blue card
      if (e.key === "b" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        window.location.href = "/blue-card"
      }

      // Add 'T' shortcut for tracker
      if (e.key === "t" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        window.location.href = "/tracker"
      }

      // Add 'M' shortcut for toggling sound
      if (e.key === "m" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setSoundEnabled((prev) => !prev)
        toast({
          title: soundEnabled ? "Sound disabled" : "Sound enabled",
          description: soundEnabled ? "Audio notifications are now muted" : "Audio notifications are now active",
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [soundEnabled])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, ariaLabel: "Go to dashboard" },
    {
      name: "Register Patient",
      href: "/register",
      icon: Plus,
      shortcut: "⌘N",
      ariaLabel: "Register a new patient",
    },
    {
      name: "Blue Card",
      href: "/blue-card",
      icon: FileText,
      shortcut: "⌘B",
      ariaLabel: "Generate blue card",
    },
    {
      name: "Patient Tracker",
      href: "/tracker",
      icon: Map,
      shortcut: "⌘T",
      ariaLabel: "Track patient journey",
    },
    { name: "Live Queue", href: "/queue", icon: Clock, ariaLabel: "View live patient queue" },
    { name: "Patient Records", href: "/patients", icon: Users, ariaLabel: "Access patient records" },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
      ariaLabel: "View notifications",
      badge: "2",
    },
    { name: "Settings", href: "/settings", icon: Settings, ariaLabel: "Manage settings" },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar for desktop */}
          <Sidebar className="hidden md:flex">
            <SidebarHeader>
              <div className="flex items-center h-16 px-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-lg">Sci-I Clinic</span>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              {/* Accessibility features section */}
              <SidebarGroup>
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">Accessibility</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.shortcut}
                      aria-label={item.ariaLabel}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge className="ml-auto" variant="secondary">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="p-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Dr. Riya Sharma</p>
                    <p className="text-xs text-muted-foreground">Receptionist</p>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-[280px] max-w-[85vw]">
              <div className="flex flex-col h-full">
                <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Sci-I Clinic</span>
                  </div>
                </div>

                {/* Accessibility controls for mobile */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Headphones className="h-4 w-4" />
                    <span className="text-sm">Sound</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
                  >
                    {soundEnabled ? "On" : "Off"}
                  </Button>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                        ${
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={item.ariaLabel}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}

                      {/* Show notification badge for notifications */}
                      {item.badge && (
                        <Badge className="ml-auto" variant="secondary">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t border-border">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Dr. Riya Sharma</p>
                      <p className="text-xs text-muted-foreground">Receptionist</p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Main content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Top navigation */}
            <div className="sticky top-0 z-20 flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm">
              <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center">
                  <SidebarTrigger className="hidden md:flex" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open sidebar</span>
                  </Button>
                  <div className="ml-2 md:ml-0 flex items-center gap-2">
                    {!searchOpen ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hidden md:flex items-center gap-2 w-64 justify-start text-muted-foreground"
                        onClick={() => setSearchOpen(true)}
                        aria-label="Search patients"
                      >
                        <Search className="h-4 w-4" />
                        <span>
                          Search patients...{" "}
                          <kbd className="ml-auto bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs">/</kbd>
                        </span>
                      </Button>
                    ) : (
                      <div className="relative hidden md:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search patients..."
                          className="w-64 pl-8 h-9"
                          autoFocus
                          onBlur={() => setSearchOpen(false)}
                          onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                          aria-label="Search patients"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick action buttons on medium screens and up */}
                <div className="hidden md:flex items-center gap-2 ml-auto mr-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-1" asChild>
                          <Link href="/register">
                            <Plus className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline-block">New Patient</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Register New Patient (Ctrl+N)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-1" asChild>
                          <Link href="/blue-card">
                            <FileText className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline-block">Blue Card</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate Blue Card (Ctrl+B)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-9 gap-1" asChild>
                          <Link href="/tracker">
                            <Map className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline-block">Tracker</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Patient Tracker (Ctrl+T)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end">
                    <div className="text-sm font-medium">{formatTime(currentTime)}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(currentTime)}</div>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setTheme(theme === "dark" ? "light" : "dark")
                            toast({
                              title: theme === "dark" ? "Light mode enabled" : "Dark mode enabled",
                              description: "Your theme preference has been updated",
                            })
                          }}
                          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        >
                          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                          <span className="sr-only">Toggle theme</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Toggle theme</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" asChild aria-label="View notifications">
                          <Link href="/notifications">
                            <Bell className="h-5 w-5" />
                            <span className="sr-only">Notifications</span>
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Notifications</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative h-8 w-8 rounded-full"
                        aria-label="User menu"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                          <AvatarFallback>DR</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Quick action buttons on small screens */}
              <div className="md:hidden flex items-center justify-between gap-1 px-4 py-2 border-t border-border overflow-x-auto">
                <Button variant="outline" size="sm" className="h-9 gap-1 whitespace-nowrap" asChild>
                  <Link href="/register">
                    <Plus className="h-3.5 w-3.5" />
                    <span>New</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-1 whitespace-nowrap" asChild>
                  <Link href="/blue-card">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Card</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-1 whitespace-nowrap" asChild>
                  <Link href="/tracker">
                    <Map className="h-3.5 w-3.5" />
                    <span>Track</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1 whitespace-nowrap"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Search</span>
                </Button>
              </div>
            </div>

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
