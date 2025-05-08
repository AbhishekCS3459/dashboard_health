"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Printer, Download, Share2, Loader2 } from "lucide-react"
import { PatientJourneyTracker } from "@/components/patient-journey-tracker"

const blueCardSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  patientName: z.string().min(1, "Patient name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  visitType: z.string().min(1, "Visit type is required"),
  department: z.string().min(1, "Department is required"),
  doctor: z.string().min(1, "Doctor is required"),
  isFollowUp: z.boolean().default(false),
  followUpDetails: z.string().optional(),
  paymentStatus: z.string().min(1, "Payment status is required"),
  notes: z.string().optional(),
})

type BlueCardValues = z.infer<typeof blueCardSchema>

export function BlueCardGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCardGenerated, setIsCardGenerated] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<BlueCardValues>({
    resolver: zodResolver(blueCardSchema),
    defaultValues: {
      patientId: "SCI-" + Math.floor(10000 + Math.random() * 90000),
      patientName: "",
      age: "",
      gender: "",
      contactNumber: "",
      visitType: "",
      department: "",
      doctor: "",
      isFollowUp: false,
      followUpDetails: "",
      paymentStatus: "pending",
      notes: "",
    },
  })

  const watchIsFollowUp = form.watch("isFollowUp")
  const watchDepartment = form.watch("department")

  function onSubmit(data: BlueCardValues) {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setIsCardGenerated(true)
      toast({
        title: "Blue Card Generated",
        description: `Blue card for ${data.patientName} has been generated successfully.`,
      })
    }, 1500)
  }

  const steps = [
    { id: 1, name: "Registration", completed: true },
    { id: 2, name: "Billing", completed: false },
    { id: 3, name: "Optometry", completed: false },
    { id: 4, name: "Doctor", completed: false },
    { id: 5, name: "Pharmacy", completed: false },
    { id: 6, name: "Optical", completed: false },
  ]

  return (
    <div className="space-y-6">
      {!isCardGenerated ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate Blue Card</CardTitle>
            <CardDescription>
              Create a new blue card for patient tracking. This will be used to track the patient's journey through the
              hospital.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient ID</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly className="bg-muted/50" />
                        </FormControl>
                        <FormDescription>Auto-generated patient ID</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter patient name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter age" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visitType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visit Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select visit type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New Visit</SelectItem>
                            <SelectItem value="followup">Follow-up</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                            <SelectItem value="referral">Referral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retina">Retina</SelectItem>
                            <SelectItem value="cornea">Cornea</SelectItem>
                            <SelectItem value="glaucoma">Glaucoma</SelectItem>
                            <SelectItem value="pediatric">Pediatric</SelectItem>
                            <SelectItem value="oculoplasty">Oculoplasty</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchDepartment}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={watchDepartment ? "Select doctor" : "Select department first"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {watchDepartment === "retina" && (
                              <>
                                <SelectItem value="dr-mehta">Dr. Mehta</SelectItem>
                                <SelectItem value="dr-sharma">Dr. Sharma</SelectItem>
                              </>
                            )}
                            {watchDepartment === "cornea" && (
                              <>
                                <SelectItem value="dr-gupta">Dr. Gupta</SelectItem>
                                <SelectItem value="dr-singh">Dr. Singh</SelectItem>
                              </>
                            )}
                            {watchDepartment === "glaucoma" && (
                              <>
                                <SelectItem value="dr-shah">Dr. Shah</SelectItem>
                                <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                              </>
                            )}
                            {watchDepartment === "pediatric" && (
                              <>
                                <SelectItem value="dr-joshi">Dr. Joshi</SelectItem>
                                <SelectItem value="dr-kumar">Dr. Kumar</SelectItem>
                              </>
                            )}
                            {watchDepartment === "oculoplasty" && (
                              <>
                                <SelectItem value="dr-reddy">Dr. Reddy</SelectItem>
                                <SelectItem value="dr-verma">Dr. Verma</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="free">Free (Follow-up)</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isFollowUp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Follow-up Visit</FormLabel>
                        <FormDescription>Check this if the patient is coming for a follow-up visit</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {watchIsFollowUp && (
                  <FormField
                    control={form.control}
                    name="followUpDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-up Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter details about the previous visit and follow-up reason"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any additional notes or special instructions"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => form.reset()}>
                    Reset
                  </Button>
                  <Button type="submit" disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Blue Card"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Patient Blue Card</CardTitle>
                <CardDescription className="text-primary-foreground/80">Patient tracking information</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="h-8 gap-1">
                  <Printer className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </Button>
                <Button variant="secondary" size="sm" className="h-8 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button variant="secondary" size="sm" className="h-8 gap-1">
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Patient ID:</div>
                    <div className="text-sm font-semibold">{form.getValues("patientId")}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Name:</div>
                    <div className="text-sm font-semibold">{form.getValues("patientName")}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Age/Gender:</div>
                    <div className="text-sm font-semibold">
                      {form.getValues("age")}/{form.getValues("gender").charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Contact:</div>
                    <div className="text-sm font-semibold">{form.getValues("contactNumber")}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Visit Type:</div>
                    <div className="text-sm font-semibold capitalize">{form.getValues("visitType")}</div>
                  </div>
                  {form.getValues("isFollowUp") && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-muted-foreground">Follow-up Details:</div>
                      <div className="text-sm">{form.getValues("followUpDetails")}</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Department:</div>
                    <div className="text-sm font-semibold capitalize">{form.getValues("department")}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Doctor:</div>
                    <div className="text-sm font-semibold">
                      {form
                        .getValues("doctor")
                        .replace("dr-", "Dr. ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Payment Status:</div>
                    <div className="text-sm font-semibold capitalize">{form.getValues("paymentStatus")}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Date & Time:</div>
                    <div className="text-sm font-semibold">
                      {new Date().toLocaleDateString()} at{" "}
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  {form.getValues("notes") && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-muted-foreground">Notes:</div>
                      <div className="text-sm">{form.getValues("notes")}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Patient Journey Tracker</h3>
              <PatientJourneyTracker steps={steps} currentStep={currentStep} />

              <div className="mt-6 flex flex-wrap gap-2">
                {steps.map((step) => (
                  <Button
                    key={step.id}
                    variant={currentStep === step.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentStep(step.id)}
                    className="flex-1 min-w-[120px]"
                  >
                    {step.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => setIsCardGenerated(false)}>
              Edit Information
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Patient Journey Started",
                  description: "The patient has been directed to the billing department.",
                })
                setCurrentStep(2)
              }}
            >
              Start Patient Journey
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
