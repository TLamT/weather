"use client"

import { useState, useEffect } from "react"

const DAYS = ["日", "一", "二", "三", "四", "五", "六"]

export default function DateTimeDisplay() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  const w = DAYS[now.getDay()]
  const hh = now.getHours().toString().padStart(2, "0")
  const mm = now.getMinutes().toString().padStart(2, "0")
  const ss = now.getSeconds().toString().padStart(2, "0")

  return (
    <span className="flex items-center gap-2 text-xs text-muted-foreground">
      <span>
        {y}年{m}月{d}日 星期{w}
      </span>
      <span className="tabular-nums font-mono">
        {hh}:{mm}:{ss}
      </span>
    </span>
  )
}
