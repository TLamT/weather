import { CloudSun } from "lucide-react"
import DateTimeDisplay from "@/components/date-time-display"
import WeatherNow from "@/components/weather-now"
import ForecastList from "@/components/forecast-list"

export default function Home() {
  return (
    <div className="min-h-svh bg-sky-50 dark:bg-sky-950 py-6">
      <div className="min-h-[297mm] mx-auto rounded-sm bg-white dark:bg-sky-950 shadow-md" style={{ maxWidth: "210mm" }}>
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-sm dark:bg-sky-950/80 rounded-sm">
          <div className="mx-auto flex items-center gap-3 px-5 py-4">
            <div className="flex size-9 items-center justify-center rounded-xl bg-sky-500 text-white">
              <CloudSun className="size-5" />
            </div>
            <div className="flex-1">
              <h1 className="text-sm font-semibold">香港天氣</h1>
              <DateTimeDisplay />
            </div>
          </div>
        </header>
        <main className="space-y-5 px-5 py-5">
          <WeatherNow />
          <ForecastList />
        </main>
      </div>
    </div>
  )
}
