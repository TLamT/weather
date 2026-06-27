"use client"

import { useEffect, useState } from "react"
import { CalendarDays, CloudRain, CloudSun, Umbrella } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchForecast, type ForecastDay } from "@/lib/weather-api"

function formatDate(dateStr: string) {
  const s = dateStr.replace(/-/g, "")
  return `${s.substring(0, 4)}/${s.substring(4, 6)}/${s.substring(6, 8)}`
}

const PSR_META: Record<string, { label: string; color: string }> = {
  "高":   { label: "高",   color: "text-blue-600 dark:text-blue-400" },
  "中高": { label: "中高", color: "text-sky-600 dark:text-sky-400" },
  "中":   { label: "中",   color: "text-amber-600 dark:text-amber-400" },
  "中低": { label: "中低", color: "text-orange-600 dark:text-orange-400" },
  "低":   { label: "低",   color: "text-green-600 dark:text-green-400" },
}

function hasRain(text: string) {
  return /驟雨|雷暴|雨|狂風/i.test(text)
}

function ForecastCard({ day }: { day: ForecastDay }) {
  const maxtemp = day.forecastMaxtemp.value
  const mintemp = day.forecastMintemp.value
  const barMinPct = 10
  const barRange = 80
  const maxPos = barMinPct + ((maxtemp - 15) / 20) * barRange
  const minPos = barMinPct + ((mintemp - 15) / 20) * barRange
  const rainy = hasRain(day.forecastWeather)
  const psr = PSR_META[day.PSR] ?? { label: day.PSR, color: "text-muted-foreground" }

  return (
    <Card size="sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold">
          {formatDate(day.forecastDate)} {day.forecastWeek}
        </span>
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-1 text-[10px] font-medium ${psr.color}`}>
            {rainy ? <CloudRain className="size-3" /> : <CloudSun className="size-3" />}
            <span>{psr.label}</span>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {day.forecastWeather}
          </Badge>
        </div>
      </div>

      <div className="relative mb-2 h-1.5 rounded-full bg-muted">
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-red-400"
          style={{
            left: `${Math.max(minPos, 0)}%`,
            width: `${Math.max(maxPos - minPos, 5)}%`,
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {mintemp}°
          </span>
          /<span className="font-semibold text-red-600 dark:text-red-400">{maxtemp}°</span>C
        </span>
        <span className="hidden sm:inline">·</span>
        <span>{day.forecastWind}</span>
        <span className="hidden sm:inline">·</span>
        <span>
          濕度{" "}
          <span className="font-medium text-green-600 dark:text-green-400">
            {day.forecastMinrh.value}–{day.forecastMaxrh.value}%
          </span>
        </span>
      </div>
    </Card>
  )
}

export default function ForecastList() {
  const [general, setGeneral] = useState("")
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchForecast()
      .then((res) => {
        setGeneral(res.generalSituation)
        setForecast(res.weatherForecast)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <CalendarDays className="size-4" />
        </div>
        <CardTitle className="text-sm">九天天氣預報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!loading && !error && (
          <>
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-orange-500">天氣概況：</span>
              {general}
            </p>
            <div className="space-y-2">
              {forecast.map((day) => (
                <ForecastCard key={day.forecastDate} day={day} />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
