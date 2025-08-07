import { WeatherData } from '@/types/Weather';
import {createSlice} from '@reduxjs/toolkit';

const initialState: {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
} = {
  weatherData: null,
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action) {
      state.weatherData = action.payload;
      state.loading = false;
    },
    fetchWeatherFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default weatherSlice.reducer;