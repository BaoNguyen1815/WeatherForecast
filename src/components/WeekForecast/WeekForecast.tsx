'use client'

import { useWeekForecastQuery } from '@/queries/weekForecast'
import { WeatherData, WeekForecastResponse } from '@/types/Weather';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { convertKelvinToCelsius, convertKelvinToFahrenheit } from '@/utils/ConvertKelvinDegree';
import './WeekForecast.scss';
import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';

const WeekForecast = () => {
    const isFahrenheit = useSelector((state: any) => state.settings.isFahrenheit);
    const weatherData: WeatherData = useSelector((state: any) => state.weather.weatherData);
    const errorFindByCity = useSelector((state: any) => state.weather.error);
    const [coords, setCoords] = React.useState<{ lat: number; lon: number } | null>(null);
    useEffect(() => {
        if (!weatherData) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCoords({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                        });
                    },
                    (err) => {
                        console.error("Geolocation error:", err);
                    }
                );
            }
        }
        else {
            setCoords({
                lat: weatherData.coord.lat,
                lon: weatherData.coord.lon,
            });
        }
    }, [weatherData]);

    const { data, error } = useWeekForecastQuery(coords?.lat ?? 0, coords?.lon ?? 0);

    const weatherEachDay = (dayLabel: string, iconUrl: string, tempK: number, weather: string) => {
        const temp = isFahrenheit ? convertKelvinToFahrenheit(tempK) : convertKelvinToCelsius(tempK);
        return <div className='weather-eachday-container' key={dayLabel}>
            <p className='date'>{dayLabel}</p>
            <img src={iconUrl} alt={weather} />
            <p className='temp'>{temp}°{isFahrenheit ? "F" : "C"}</p>

            <p className='weather'>{weather}</p>
        </div>
    }

    const renderWeekForecast = () => {
        if (data?.daily?.length > 0) {
            return data.daily.slice(1).map((day: WeekForecastResponse) => {
                const date = new Date(day.dt * 1000);
                const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
                const dayOfMonth = date.getDate();
                const dayLabel = `${dayOfWeek} ${dayOfMonth}`;
                const tempK = day.temp.day;
                const weatherDescription = day.weather[0].description;
                const weatherIcon = day.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                return weatherEachDay(dayLabel, iconUrl, tempK, weatherDescription);
            });
        }
        return <></>
    }
    if (error || errorFindByCity) {
        return <Error message = {errorFindByCity || error}/>
    }

    return (
        <div className='week-forecast-conainer'>
            <p>Daily weather in <b>{weatherData?.name ?? "your place"}</b></p>
            {data?.daily ? <div className='continous-day-weather-container'>
                {renderWeekForecast()}
            </div>: <Spinner />}
        </div>
    )
}

export default WeekForecast