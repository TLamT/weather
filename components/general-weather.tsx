"use client"

import { useEffect, useState } from "react"
import { Newspaper } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchGeneralWeather } from "@/lib/weather-api"

export default function GeneralWeather() {
  const [period, setPeriod] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGeneralWeather()
      .then((res) => {
        setPeriod(res.forecastPeriod)
        setDesc(`${res.generalSituation} ${res.forecastDesc} ${res.outlook}`)
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
        <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          <Newspaper className="size-4" />
        </div>
        <CardTitle className="text-sm">天氣預報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!loading && !error && (
          <>
            <p className="text-xs font-medium text-muted-foreground">{period}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
