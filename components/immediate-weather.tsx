"use client"

import { useEffect, useState } from "react"
import { Thermometer, MapPin } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchImmediateWeather, type TemperatureData } from "@/lib/weather-api"

export default function ImmediateWeather() {
  const [data, setData] = useState<TemperatureData[]>([])
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchImmediateWeather()
      .then((res) => {
        setData(res.temperature.data)
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [])

  const selected = data.find((d) => d.place === selectedPlace)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
          <Thermometer className="size-4" />
        </div>
        <CardTitle className="text-sm">即時溫度</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-5 w-48" />
          </div>
        )}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {!loading && !error && (
          <div className="space-y-3">
            <Select value={selectedPlace} onValueChange={setSelectedPlace}>
              <SelectTrigger className="w-full min-h-10">
                <SelectValue placeholder="請選擇地區">
                  {selectedPlace && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-muted-foreground" />
                      {selectedPlace}
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {data.map((d) => (
                  <SelectItem key={d.place} value={d.place}>
                    {d.place}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selected ? (
              <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                <span className="text-4xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                  {selected.value}
                  <span className="text-lg font-normal">°C</span>
                </span>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3" />
                    {selected.place}
                  </div>
                  <div>現時溫度</div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                請在上方選擇一個地區查看即時溫度
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
