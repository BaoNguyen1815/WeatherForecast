import WeekForecast from '@/components/WeekForecast/WeekForecast'
import { Metadata } from 'next';
import React from 'react'
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "7-Day Weather Forecast",
  description: "See the detailed 7-day weather forecast for your location.",
};

function Page() {

  return (
    <div className={styles.page}>
      <WeekForecast />
    </div>
  )
}

export default Page