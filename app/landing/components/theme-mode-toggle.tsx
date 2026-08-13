"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { ChevronDown, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const options = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
] as const

const emptySubscribe = () => () => {}

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  // Matches the server render (false) until the client takes over, avoiding a hydration mismatch.
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener("pointerdown", onPointerDown)
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [])

  const activeOption = mounted
    ? options.find((option) => option.key === (theme ?? "system")) ?? options[2]
    : options[2]

  const ActiveIcon = activeOption.icon

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-full bg-background/90 px-3 backdrop-blur"
        aria-label="Theme mode"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <ActiveIcon className="size-4" />
        <span>{activeOption.label}</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </Button>

      {open ? (
        <div className="absolute right-0 z-40 mt-2 w-44 rounded-xl border border-border bg-popover p-1 shadow-lg">
          {options.map((option) => {
            const Icon = option.icon
            const isActive = option.key === activeOption.key

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  setTheme(option.key)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-popover-foreground hover:bg-muted"
                )}
              >
                <Icon className="size-4" />
                {option.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
