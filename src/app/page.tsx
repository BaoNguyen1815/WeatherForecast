'use client';

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import styles from "./page.module.css";
import CurrentDayWeather from "@/components/CurrentDayWeather/CurrentDayWeather";
import { useSelector } from "react-redux";
import { weatherImgOnWeatherStatus } from "@/constants/weatherStatus";

export default function Home() {
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  return (
    <div className={styles.page} style={{
      backgroundImage: weatherData?.weather?.[0]?.main ? `url(${weatherImgOnWeatherStatus[weatherData?.weather?.[0]?.main]})` : 'https://i.pinimg.com/736x/db/35/a6/db35a6d18d9df01dc12ee644c248f56d.jpg',
    }} >
      <ErrorBoundary>
        <CurrentDayWeather />
      </ErrorBoundary>
    </div>
  );
}
