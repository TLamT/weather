"use client"

import { useEffect, useState } from "react"
import { TriangleAlert } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchWarnings, type WarningInfo } from "@/lib/weather-api"

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

function getIcon(w: WarningInfo): string {
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

function getLabel(w: WarningInfo): string {
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
          const icon = getIcon(w)
          const label = getLabel(w)
          return (
            <div key={w.code} className="flex items-center gap-2 text-sm">
              <div className="flex size-7 shrink-0 items-center justify-center">
                {icon ? (
                  <img src={icon} alt={label} className="size-6 object-contain" />
                ) : (
                  <TriangleAlert className="size-4 text-muted-foreground" />
                )}
              </div>
              <span className="font-medium">{label}</span>
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
