"use client"

import { useEffect, useState } from "react"
import { Thermometer, MapPin, Newspaper } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchImmediateWeather, fetchGeneralWeather, fetchWarnings, type TemperatureData, type WarningInfo } from "@/lib/weather-api"

const WARNING_ICONS: Record<string, string> = {
  WTS:    "/warnings/ts.gif",
  WHOT:   "/warnings/vhot.gif",
  WCOLD:  "/warnings/cold.gif",
  WFROST: "/warnings/frost.gif",
  WMSGNL: "/warnings/sms.gif",
  WFNTSA: "/warnings/ntfl.gif",
  WL:     "/warnings/landslip.gif",
  WTMW:   "/warnings/tsunami-warn.gif",
}

function getWarningIcon(w: WarningInfo): string {
  if (w.code === "WRAIN") {
    if (w.name.includes("黃")) return "/warnings/raina.gif"
    if (w.name.includes("紅")) return "/warnings/rainr.gif"
    return "/warnings/rainb.gif"
  }
  if (w.code === "WFIRE") {
    if (w.name.includes("黃")) return "/warnings/firey.gif"
    return "/warnings/firer.gif"
  }
  if (w.code === "WTCSGNL") {
    if (w.name.includes("一號")) return "/warnings/tc1.gif"
    if (w.name.includes("三號")) return "/warnings/tc3.gif"
    if (w.name.includes("八號")) {
      if (w.name.includes("東北")) return "/warnings/tc8ne.gif"
      if (w.name.includes("西北")) return "/warnings/tc8d.gif"
      if (w.name.includes("東南")) return "/warnings/tc8b.gif"
      if (w.name.includes("西南")) return "/warnings/tc8c.gif"
      return "/warnings/tc8ne.gif"
    }
    if (w.name.includes("九號")) return "/warnings/tc9.gif"
    if (w.name.includes("十號")) return "/warnings/tc10.gif"
    return "/warnings/tc1.gif"
  }
  return WARNING_ICONS[w.code] || ""
}

function getWarningLabel(w: WarningInfo): string {
  if (w.code === "WRAIN") {
    const sub = w.name.includes("黃") ? "黃" : w.name.includes("紅") ? "紅" : "黑"
    return `${sub}色暴雨警告`
  }
  if (w.code === "WFIRE") {
    const sub = w.name.includes("黃") ? "黃" : "紅"
    return `${sub}色火災危險警告`
  }
  return w.name
}

function formatTime(t: string) {
  const d = new Date(t)
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
}

function getOverallTemp(data: TemperatureData[]): { place: string; value: number } | null {
  const hko = data.find((d) => d.place === "香港天文台")
  if (hko) return hko
  if (!data.length) return null
  const avg = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)
  return { place: "香港平均", value: avg }
}

export default function WeatherNow() {
  const [mainTemp, setMainTemp] = useState<{ place: string; value: number } | null>(null)
  const [allTemps, setAllTemps] = useState<TemperatureData[]>([])
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [period, setPeriod] = useState("")
  const [desc, setDesc] = useState("")
  const [warnings, setWarnings] = useState<WarningInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchImmediateWeather(),
      fetchGeneralWeather(),
      fetchWarnings(),
    ])
      .then(([immediate, general, warn]) => {
        setMainTemp(getOverallTemp(immediate.temperature.data))
        setAllTemps(immediate.temperature.data)
        setPeriod(general.forecastPeriod)
        setDesc(`${general.generalSituation} ${general.forecastDesc} ${general.outlook}`)
        setWarnings(Object.values(warn))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selected = allTemps.find((d) => d.place === selectedPlace)

  if (loading) {
    return (
      <Card>
        <CardContent className="space-y-4 py-6">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="divide-y divide-border/50 *:py-4 first:*:pt-0 last:*:pb-0">
        {/* Main temp */}
        {mainTemp && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400">
                <Thermometer className="size-7" />
              </div>
              <div>
                <div className="text-5xl font-bold tabular-nums tracking-tight">
                  {mainTemp.value}<span className="text-xl font-medium text-muted-foreground">°C</span>
                </div>
                <div className="text-sm text-muted-foreground">{mainTemp.place}</div>
              </div>
            </div>
            <div className="text-right text-sm leading-relaxed text-muted-foreground max-w-56">
              <div className="font-medium text-foreground">{period}</div>
              <div className="line-clamp-3">{desc}</div>
            </div>
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {warnings.map((w) => {
              const icon = getWarningIcon(w)
              const label = getWarningLabel(w)
              return (
                <div key={w.code} className="flex items-center gap-2 text-sm">
                  {icon && <img src={icon} alt={label} className="size-6 object-contain" />}
                  <span className="font-medium">{label}</span>
                  <span className="text-muted-foreground">{formatTime(w.issueTime)}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Location selector */}
        <div className="flex items-center gap-4">
          <Select value={selectedPlace} onValueChange={setSelectedPlace}>
            <SelectTrigger className="w-52 h-10 text-sm">
              <SelectValue placeholder="選擇地區">
                {selectedPlace && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {selectedPlace}
                  </span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {allTemps.map((d) => (
                <SelectItem key={d.place} value={d.place}>
                  {d.place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selected ? (
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-2 dark:bg-blue-950/30">
              <span className="text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                {selected.value}<span className="text-base font-normal">°C</span>
              </span>
              <MapPin className="size-4 text-muted-foreground" />
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">選擇地區查看即時溫度</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
