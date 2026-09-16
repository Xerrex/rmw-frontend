import { AuthPanel } from "./components/auth-panel"
import { HeroPanel } from "./components/hero-panel"
import { ThemeModeToggle } from "./components/theme-mode-toggle"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground lg:h-screen lg:overflow-hidden">
      <div className="absolute right-4 top-4 z-50 sm:right-6 sm:top-6 lg:right-8 lg:top-6">
        <ThemeModeToggle />
      </div>

      <main className="w-full lg:h-full">
        <div className="grid min-h-screen grid-cols-1 border border-border shadow-xl lg:h-full lg:overflow-hidden lg:grid-cols-2">
          <HeroPanel />
          <AuthPanel />
        </div>
      </main>
    </div>
  )
}

