import { CloudSun } from "lucide-react"
import DateTimeDisplay from "@/components/date-time-display"
import CurrentWeather from "@/components/current-weather"
import WeatherWarnings from "@/components/weather-warnings"
import ImmediateWeather from "@/components/immediate-weather"
import GeneralWeather from "@/components/general-weather"
import ForecastList from "@/components/forecast-list"

export default function Home() {
  return (
    <div className="min-h-svh bg-sky-50 dark:bg-sky-950">
      <header className="sticky top-0 z-10 border-b bg-sky-50/80 backdrop-blur-sm dark:bg-sky-950/80">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3 md:px-6">
          <div className="flex size-9 items-center justify-center rounded-xl bg-sky-500 text-white">
            <CloudSun className="size-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-semibold">香港天氣</h1>
            <DateTimeDisplay />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-2xl space-y-3 px-4 py-4 md:space-y-4 md:px-6 md:py-6">
        <CurrentWeather />
        <WeatherWarnings />
        <ImmediateWeather />
        <GeneralWeather />
        <ForecastList />
      </main>
    </div>
  )
}
