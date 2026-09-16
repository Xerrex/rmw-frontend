"use client"

import { useState } from "react"
import { format, startOfDay } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DateTimePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  minDate?: Date
  placeholder?: string
  disabled?: boolean
  id?: string
}

export function DateTimePicker({
  value, onChange, minDate, placeholder = "Pick a date & time", disabled, id,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false)
  const timeValue = value ? format(value, "HH:mm") : ""

  function handleDateSelect(date: Date | undefined) {
    if (!date) {
      onChange(undefined)
      return
    }
    const next = new Date(date)
    next.setHours(value?.getHours() ?? 0, value?.getMinutes() ?? 0, 0, 0)
    onChange(next)
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [hours, minutes] = e.target.value.split(":").map(Number)
    const next = new Date(value ?? new Date())
    next.setHours(hours, minutes, 0, 0)
    onChange(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {value ? format(value, "dd MMM yyyy, HH:mm") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          disabled={(date) => (minDate ? date < startOfDay(minDate) : false)}
          autoFocus
        />
        <div className="border-t p-3">
          <Input type="time" value={timeValue} onChange={handleTimeChange} disabled={!value} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
