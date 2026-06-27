"use client"

import { useEffect, useState } from "react"
import { Thermometer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchImmediateWeather, type TemperatureData } from "@/lib/weather-api"

function getOverallTemp(data: TemperatureData[]): { place: string; value: number } | null {
  const hko = data.find((d) => d.place === "香港天文台")
  if (hko) return hko
  const avg = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)
  return { place: "香港平均", value: avg }
}

export default function CurrentWeather() {
  const [temp, setTemp] = useState<{ place: string; value: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImmediateWeather()
      .then((res) => {
        setTemp(getOverallTemp(res.temperature.data))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        {loading ? (
          <div className="h-10 w-48 animate-pulse rounded bg-muted" />
        ) : temp ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                <Thermometer className="size-5" />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground">香港現時溫度</div>
                <div className="text-xs text-muted-foreground/70">{temp.place}</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold tabular-nums tracking-tight text-foreground">
                {temp.value}
              </span>
              <span className="text-lg font-medium text-muted-foreground">°C</span>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
