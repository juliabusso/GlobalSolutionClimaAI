'use client'

import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import { Input } from '@/components/Input/Input'
import { CloudRain, CloudSun, Snowflake, Sun, Wind } from 'lucide-react'
import { useState } from 'react'

// Tipagem dos dados da previsão do tempo
type ForecastData = {
  daily: {
    time: string[]
    weathercode: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    windspeed_10m_max: number[]
  }
}

const getWeatherIcon = (code: number) => {
  if ([0, 1].includes(code)) return <Sun className="text-yellow-500 w-8 h-8" />
  if ([2].includes(code)) return <CloudSun className="text-blue-500 w-8 h-8" />
  if ([3, 45, 48].includes(code)) return <CloudRain className="text-gray-500 w-8 h-8" />
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className="text-blue-400 w-8 h-8" />
  if ([71, 73, 75, 85, 86].includes(code)) return <Snowflake className="text-blue-300 w-8 h-8" />
  return <Wind className="text-gray-400 w-8 h-8" />
}

export default function WeatherPage() {
  const [city, setCity] = useState('')
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(false)

  const getForecast = async () => {
    setLoading(true)
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      )
      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) {
        setForecast(null)
        setLoading(false)
        return
      }

      const { latitude, longitude } = geoData.results[0]
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=auto`
      )
      const weatherData = await weatherRes.json()
      setForecast(weatherData)
    } catch (err) {
      console.error(err)
      setForecast(null)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-10">
      <h1 className="text-2xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
        Previsão do Tempo
      </h1>
      <div className="max-w-md mx-auto flex gap-2 mb-8">
        <Input
          placeholder="Digite a cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={getForecast} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>

      {forecast && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forecast.daily.time.map((date, index) => (
            <Card key={date} className="bg-blue-50">
              <CardContent className="p-4 text-center">
                <p className="font-semibold text-blue-700">
                  {new Date(date).toLocaleDateString()}
                </p>
                <div className="flex justify-center my-2">
                  {getWeatherIcon(forecast.daily.weathercode[index])}
                </div>
                <p className="text-blue-800">
                  Máx: {forecast.daily.temperature_2m_max[index]}°C
                </p>
                <p className="text-blue-800">
                  Mín: {forecast.daily.temperature_2m_min[index]}°C
                </p>
                <p className="text-sm text-gray-500">
                  Vento: {forecast.daily.windspeed_10m_max[index]} km/h
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
 