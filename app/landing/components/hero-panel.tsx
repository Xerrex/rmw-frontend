import { Car, CircleDollarSign, GitPullRequestArrow, MapPinned, Route } from "lucide-react"

const features = [
  {
    title: "Route-matched requests",
    description:
      "Passengers request pickup and drop-off points that stay on the driver's route.",
    icon: Route,
    iconClassName: "text-emerald-500",
    bgClassName: "bg-emerald-500/15",
  },
  {
    title: "Driver ride publishing",
    description:
      "Drivers define vehicle number, available seats, start and end towns, start time, and ETA.",
    icon: MapPinned,
    iconClassName: "text-sky-500",
    bgClassName: "bg-sky-500/15",
  },
  {
    title: "Trusted join workflow",
    description:
      "Join requests and approvals keep both sides informed before every shared trip.",
    icon: GitPullRequestArrow,
    iconClassName: "text-violet-500",
    bgClassName: "bg-violet-500/15",
  },
  {
    title: "Cost sharing made simple",
    description:
      "Split ride costs transparently while making recurring commutes more affordable.",
    icon: CircleDollarSign,
    iconClassName: "text-amber-500",
    bgClassName: "bg-amber-500/15",
  },
]

export function HeroPanel() {
  return (
    <section className="relative flex min-h-[50vh] lg:h-full items-center overflow-hidden bg-linear-to-br from-primary via-sky-600 to-cyan-500 px-6 py-12 text-white sm:px-10 sm:py-14 lg:px-12 lg:py-14">
      <div className="absolute -left-24 top-6 size-56 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 right-8 size-64 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-3xl space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase">
            <Car className="size-3.5" />
            Ride My Way
          </div>

          <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
            Share your route,
            <br />
            split your ride cost.
          </h1>

          <p className="max-w-2xl text-base text-sky-50/90 sm:text-lg">
            Ride My Way connects people traveling in the same direction so drivers can
            offer seats and passengers can join the ride within the planned route.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.title}
                className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
              >
                <div
                  className={`mb-3 inline-flex size-9 items-center justify-center rounded-lg ${feature.bgClassName}`}
                >
                  <Icon className={`size-5 ${feature.iconClassName}`} />
                </div>
                <h2 className="text-base font-semibold text-white">{feature.title}</h2>
                <p className="mt-1 text-sm text-sky-100/90">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
