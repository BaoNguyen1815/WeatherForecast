import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from "./WeatherReducer";
import SettingReducer from "./UnitReducer";

export const store = configureStore({
  reducer: {
    weather: WeatherReducer,
    settings: SettingReducer,
  },
}); 