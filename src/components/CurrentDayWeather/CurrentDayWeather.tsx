'use client'

import { useWeatherQuery } from '@/queries/weather';
import { WeatherData } from '@/types/Weather';
import { convertKelvinToCelsius, convertKelvinToFahrenheit } from '@/utils/ConvertKelvinDegree';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './CurrentDayWeather.scss';
import { weatherSlice } from '@/store/WeatherReducer';
import Link from 'next/link';
import Error from '../Error/Error';
import { setIsFahrenheit } from '@/store/UnitReducer';

const CurrentDayWeather = () => {
  const weatherData: WeatherData = useSelector((state: any) => state.weather.weatherData);
  const loading: boolean = useSelector((state: any) => state.weather.loading);
  const error: string | null = useSelector((state: any) => state.weather.error);
  const isFahrenheit = useSelector((state: any) => state.settings.isFahrenheit);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [])

  const { data, isLoading, error: queryError } = useWeatherQuery(
    coords?.lat ?? 0,
    coords?.lon ?? 0,
    !!weatherData
  );

  useEffect(() => {
  if (isLoading) {
    dispatch(weatherSlice.actions.fetchWeatherStart());
  }
}, [isLoading, dispatch]);

  useEffect(() => {
    if (data && !weatherData) {
      console.log("Weather data fetched successfully:", data);
      dispatch(weatherSlice.actions.fetchWeatherSuccess(data as WeatherData));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (queryError) {
      dispatch(weatherSlice.actions.fetchWeatherFailure(queryError.message));
    }
  }, [queryError, dispatch]);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
   return <Error message={error}/>
  }
  if (weatherData) {
    return <div className='current-day-weather'>
      <Link href={'/continous'} className='name'>{weatherData?.name}</Link>
      <div className='temperature'>
        <div className='temp-value-container'>
          <span className='temp-value'>{isFahrenheit ? convertKelvinToFahrenheit(weatherData?.main.temp) : convertKelvinToCelsius(weatherData?.main.temp)}</span>
          <span className='degree'>&deg;</span>
        </div>
        <div className='unit-toggle'>
          <p className={`unit${!isFahrenheit ? ' selected' : ''}`} onClick={() => dispatch(setIsFahrenheit(false))}>C</p>
          <p className={`unit${isFahrenheit ? ' selected' : ''}`} onClick={() => dispatch(setIsFahrenheit(true))}>F</p>
        </div>
      </div>
      <p className='weather'>{weatherData?.weather[0].main}</p>
      <div className='details'>
        <p>Wind: {weatherData?.wind.speed} mph</p>
        <p>Humidity: {weatherData?.main.humidity} %</p>
      </div>
    </div>;
  }
  return <p>Please enter a city name</p>

}

export default CurrentDayWeather