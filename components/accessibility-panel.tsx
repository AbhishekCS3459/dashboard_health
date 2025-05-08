"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Headphones, Type, ZoomIn, Volume2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function AccessibilityPanel() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [volume, setVolume] = useState([50])
  const [screenReader, setScreenReader] = useState(false)

  const handleSave = () => {
    // Apply accessibility settings
    document.documentElement.classList.toggle("high-contrast", highContrast)
    document.documentElement.classList.toggle("large-text", largeText)

    // Save settings to localStorage
    localStorage.setItem(
      "accessibility",
      JSON.stringify({
        soundEnabled,
        highContrast,
        largeText,
        volume: volume[0],
        screenReader,
      }),
    )

    toast({
      title: "Accessibility settings saved",
      description: "Your preferences have been updated",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Accessibility options">
          <Headphones className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>Customize your experience to make the application more accessible.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Label htmlFor="sound" className="text-sm">
                Sound Effects
              </Label>
            </div>
            <Switch
              id="sound"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
              aria-label="Toggle sound effects"
            />
          </div>

          {soundEnabled && (
            <div className="space-y-2">
              <Label htmlFor="volume" className="text-sm">
                Volume Level
              </Label>
              <Slider
                id="volume"
                min={0}
                max={100}
                step={1}
                value={volume}
                onValueChange={setVolume}
                aria-label="Adjust volume"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <Label htmlFor="largeText" className="text-sm">
                Large Text
              </Label>
            </div>
            <Switch id="largeText" checked={largeText} onCheckedChange={setLargeText} aria-label="Toggle large text" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZoomIn className="h-4 w-4" />
              <Label htmlFor="highContrast" className="text-sm">
                High Contrast
              </Label>
            </div>
            <Switch
              id="highContrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
              aria-label="Toggle high contrast"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              <Label htmlFor="screenReader" className="text-sm">
                Screen Reader Optimized
              </Label>
            </div>
            <Switch
              id="screenReader"
              checked={screenReader}
              onCheckedChange={setScreenReader}
              aria-label="Toggle screen reader optimization"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
