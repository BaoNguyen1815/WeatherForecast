'use client'

import { useWeatherQuery } from '@/queries/weather';
import { WeatherData } from '@/types/Weather';
import { convertKelvinToCelsius, convertKelvinToFahrenheit } from '@/utils/ConvertKelvinDegree';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import './CurrentDayWeather.scss';
import { weatherSlice } from '@/store/WeatherReducer';
import Link from 'next/link';
import Error from '../Error/Error';
import { setIsFahrenheit } from '@/store/UnitReducer';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';

const CurrentDayWeather = () => {
  const weatherData: WeatherData = useSelector((state: any) => state.weather.weatherData);
  const loading: boolean = useSelector((state: any) => state.weather.loading);
  const error: string | null = useSelector((state: any) => state.weather.error);
  const isFahrenheit = useSelector((state: any) => state.settings.isFahrenheit);
  const { coords, requestLocation } = useCurrentLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!weatherData && !coords) {
      requestLocation();
    }
  }, [weatherData, coords, requestLocation]);

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
  if( error?.includes("location access")) {
    return <p>Please enter a city name</p>;
  }
  if (error) {
    return <Error message={error} />
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
  return <Spinner />

}

export default CurrentDayWeather