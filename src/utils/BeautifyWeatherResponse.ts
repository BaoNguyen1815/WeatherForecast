import { WeatherData, WeatherResponse } from "@/types/Weather";

const beautifyWeatherResponse = (data: WeatherResponse): WeatherData => {
    return {
        name: data.name,
        main: {
            temp: data.main.temp,
            humidity: data.main.humidity,
        },
        weather: data.weather.map((w) => ({
            main: w.main,
            description: w.description,
        })),
        wind: {
            speed: data.wind.speed,
        },
        coord: {
            lat: data.coord.lat,
            lon: data.coord.lon,
        },
    };
}

export default beautifyWeatherResponse;