"use client"

import { useEffect, useState } from "react"
import { TriangleAlert, CloudLightning, Wind, Thermometer, Droplets, Waves, Snowflake, Cloud } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchWarnings, type WarningInfo } from "@/lib/weather-api"

const WARNING_META: Record<string, { label: string; icon: typeof TriangleAlert; color: string; bg: string }> = {
  WTS:       { label: "雷暴警告",       icon: CloudLightning, color: "text-amber-600",  bg: "bg-amber-100 dark:bg-amber-900/30" },
  WRAIN:     { label: "暴雨警告",       icon: Droplets,       color: "text-blue-600",   bg: "bg-blue-100 dark:bg-blue-900/30" },
  WHOT:      { label: "酷熱天氣警告",   icon: Thermometer,    color: "text-red-500",    bg: "bg-red-100 dark:bg-red-900/30" },
  WCOLD:     { label: "寒冷天氣警告",   icon: Snowflake,      color: "text-sky-600",    bg: "bg-sky-100 dark:bg-sky-900/30" },
  WFIRE:     { label: "火災危險警告",   icon: TriangleAlert,  color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
  WFROST:    { label: "霜凍警告",       icon: Snowflake,      color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
  WMSGNL:    { label: "強烈季候風信號", icon: Wind,           color: "text-teal-600",   bg: "bg-teal-100 dark:bg-teal-900/30" },
  WFNTSA:    { label: "新界北水浸報告", icon: Droplets,       color: "text-cyan-600",   bg: "bg-cyan-100 dark:bg-cyan-900/30" },
  WL:        { label: "山泥傾瀉警告",   icon: Waves,          color: "text-amber-700",  bg: "bg-amber-100 dark:bg-amber-900/30" },
  WTCSGNL:   { label: "熱帶氣旋警告",   icon: Cloud,          color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  WTMW:      { label: "海嘯警告",       icon: Waves,          color: "text-red-600",    bg: "bg-red-100 dark:bg-red-900/30" },
}

function getMeta(w: WarningInfo) {
  const base = WARNING_META[w.code]
  if (!base) return { label: w.name, icon: TriangleAlert, color: "text-muted-foreground", bg: "bg-muted" }

  if (w.code === "WRAIN") {
    const sub = w.name.includes("黃") ? "黃" : w.name.includes("紅") ? "紅" : "黑"
    return { ...base, label: `${sub}色暴雨警告` }
  }
  if (w.code === "WFIRE") {
    const sub = w.name.includes("黃") ? "黃" : "紅"
    return { ...base, label: `${sub}色火災危險警告` }
  }
  return base
}

function formatTime(t: string) {
  const d = new Date(t)
  const hh = String(d.getHours()).padStart(2, "0")
  const mm = String(d.getMinutes()).padStart(2, "0")
  return `${hh}:${mm}`
}

export default function WeatherWarnings() {
  const [warnings, setWarnings] = useState<WarningInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWarnings()
      .then((res) => {
        setWarnings(Object.values(res))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return null
  if (warnings.length === 0) return null

  return (
    <Card>
      <CardContent className="space-y-2 py-3">
        {warnings.map((w) => {
          const meta = getMeta(w)
          const Icon = meta.icon
          return (
            <div key={w.code} className="flex items-center gap-2 text-sm">
              <div className={`flex size-7 shrink-0 items-center justify-center rounded-full ${meta.bg}`}>
                <Icon className={`size-3.5 ${meta.color}`} />
              </div>
              <span className="font-medium">{meta.label}</span>
              <span className="text-xs text-muted-foreground">
                （{formatTime(w.issueTime)} 發出）
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
