import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  isFahrenheit: boolean;
}

const initialState: SettingsState = {
  isFahrenheit:
    typeof window !== 'undefined'
      ? localStorage.getItem('isFahrenheit') === 'true'
      : false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsFahrenheit: (state, action: PayloadAction<boolean>) => {
      state.isFahrenheit = action.payload;
      localStorage.setItem('isFahrenheit', String(action.payload));
    },
  },
});

export const { setIsFahrenheit } = settingsSlice.actions;
export default settingsSlice.reducer