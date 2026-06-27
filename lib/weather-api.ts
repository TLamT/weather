const API_BASE = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php"

export type TemperatureData = {
  place: string
  value: number
  unit: string
}

export type RhrreadResponse = {
  temperature: {
    data: TemperatureData[]
  }
}

export type ForecastDay = {
  forecastDate: string
  forecastWeek: string
  forecastWeather: string
  forecastMaxtemp: { value: number; unit: string }
  forecastMintemp: { value: number; unit: string }
  forecastWind: string
  forecastMinrh: { value: number; unit: string }
  forecastMaxrh: { value: number; unit: string }
  PSR: string
}

export type FndResponse = {
  generalSituation: string
  weatherForecast: ForecastDay[]
}

export type FlwResponse = {
  generalSituation: string
  forecastPeriod: string
  forecastDesc: string
  outlook: string
}

export async function fetchImmediateWeather(): Promise<RhrreadResponse> {
  const res = await fetch(`${API_BASE}?dataType=rhrread&lang=tc`)
  if (!res.ok) throw new Error("Failed to fetch immediate weather")
  return res.json()
}

export async function fetchForecast(): Promise<FndResponse> {
  const res = await fetch(`${API_BASE}?dataType=fnd&lang=tc`)
  if (!res.ok) throw new Error("Failed to fetch forecast")
  return res.json()
}

export type WarningCode =
  | "WTS" | "WRAIN" | "WHOT" | "WCOLD" | "WFIRE"
  | "WFROST" | "WMSGNL" | "WFNTSA" | "WL"
  | "WTCSGNL" | "WTMW"

export type WarningInfo = {
  code: string
  name: string
  actionCode: string
  issueTime: string
  expireTime?: string
}

export type WarnsumResponse = Record<string, WarningInfo>

export async function fetchWarnings(): Promise<WarnsumResponse> {
  const res = await fetch(`${API_BASE}?dataType=warnsum&lang=tc`)
  if (!res.ok) throw new Error("Failed to fetch warnings")
  return res.json()
}

export async function fetchGeneralWeather(): Promise<FlwResponse> {
  const res = await fetch(`${API_BASE}?dataType=flw&lang=tc`)
  if (!res.ok) throw new Error("Failed to fetch general weather")
  return res.json()
}
