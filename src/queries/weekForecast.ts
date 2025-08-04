import { httpService } from "@/services/httpServices";
import { useQuery } from "@tanstack/react-query";


const getWeatherForAWeek = async (lat: number, lon: number): Promise<any> => {
  const { get } = httpService();
  const url = `/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_WEATHERMAP_API_KEY}`;
  const response = await get(url);
  return response.data;
}

export const useWeekForecastQuery = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['weekForecast', lat, lon],
    queryFn: () => getWeatherForAWeek(lat, lon),
    enabled: !!(lat && lon),
    retry: 1,
  });
}