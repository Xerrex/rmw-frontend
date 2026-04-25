import { AuthPanel } from "./components/auth-panel"
import { HeroPanel } from "./components/hero-panel"
import { ThemeModeToggle } from "./components/theme-mode-toggle"

export default function LandingPage() {
  return (
    <div className="relative h-screen bg-background text-foreground">
      <div className="absolute right-4 top-4 z-50 sm:right-6 sm:top-6 lg:right-8 lg:top-6">
        <ThemeModeToggle />
      </div>

      <main className="h-full w-full">
        <div className="grid h-full overflow-hidden border border-border shadow-xl lg:grid-cols-2">
          <HeroPanel />
          <AuthPanel />
        </div>
      </main>
    </div>
  )
}
