"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
  completed: boolean
}

interface PatientJourneyTrackerProps {
  steps: Step[]
  currentStep: number
}

export function PatientJourneyTracker({ steps, currentStep }: PatientJourneyTrackerProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-max">
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-500 ease-in-out"
              style={{
                width: `${Math.max(0, (currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors duration-300",
                    step.id < currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : step.id === currentStep
                        ? "border-primary bg-background text-primary"
                        : "border-muted bg-background text-muted-foreground",
                  )}
                >
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : <span className="text-xs">{step.id}</span>}
                </div>
                <div className="mt-2 text-center w-20 xs:w-24 sm:w-28">
                  <div
                    className={cn(
                      "text-xs font-medium transition-colors",
                      step.id <= currentStep ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
