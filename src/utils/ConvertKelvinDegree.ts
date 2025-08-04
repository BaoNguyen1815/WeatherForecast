export const convertKelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
}

export const convertKelvinToFahrenheit = (kelvin: number): number => {
  return Math.round((kelvin - 273.15) * 9/5 + 32);
}